const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
require("dotenv").config();
const { user, Messages } = require("../models");
const SECRET = process.env.SECRET;

//creation du schemas
let schema = new passwordValidator();

schema
  .is().min(8) //au moins 8 caractères
  .is().max(20) // pas plus de 20 caractères
  .has().uppercase() // au moins une minuscule
  .has().lowercase() // au moins une majuscule
  .has().digits() // au moins un chiffre
  .has().not().spaces() //pas d'espaces
  .is().not().oneOf(["Passw0rd", "Password123"]);
  
const regexEmail = /\S+@\S+\.\S+/

  //créer un nouvel utilisateur 

exports.signup = async (req, res) => {
  // Valider les paramètres de la requète
  const { email, firstname, lastname, password } = req.body; 
  if (!regexEmail.test(email)) {
    res.status(400).json({ error: "Email incorrect" });
  }
  if (!schema.validate(password)) {
    res.status(400).json({
      error:
        "le mot de passe doit contenir au moins 8 caractères dont 1 chiffre, 1 lettre majuscule et 1 minuscule",
    });
  }
  const isFieldsEmpty = !email || !firstname || !lastname || !password;

  if (isFieldsEmpty) {
    // si vide ou n existe pas
    res.status(400).json({ error: "Merci de remplir tous les champs !" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const User = await user.create({ //creation du user
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hash,
    });
    res.status(201).json({
      userId: user.id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
console.log(user);

// Se connecter 

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }
  try {
    const User = await user.findOne({ where: { email } }); //cherche si mon user existe a partir de l'email
    const isValid = await bcrypt.compare(password, User.password);
    if (!isValid) {
      res.status(401).json({ error: "Utilisateur non trouvé !" });
      return;
    }
    res.status(200).json({
      userId: user.id, // avec l'id 
      isAdmin: user.isAdmin,
      firstname: user.firstname,
      lastname: user.lastname,
      token: jwt.sign( //
        //et avec un token /// 2 arguments demandés: 
        {
          userId: user.id,
          SERCET,
          isAdmin: user.isAdmin,
        } /*correspondance de l'id utilisateur*/,
        process.env.SECRET, /*le token*/
        { expiresIn: "24h" }
      ),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Ajouter un profil 

exports.getOneProfile = (req, res, next) => {
  user.findOne({
    attributes: ["id", "email", "firstname", "lastname"],
    where: { id: req.params.id },
  })
  console.log(user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
        message: "Utilisateur non trouvé !",
      });
    });
};


// Modifier le profil 

exports.modifyProfile = async (req, res, next) => {
  try {
    if (!req.body.firstname || !req.body.lastname) {
      res.status(400).json({
        error: "Veuillez remplir tous les champs !",
      });
      return;
    }
    const user = await user.findOne({ where: { id: req.params.id } });
    if (user.id === res.locals.userId || res.locals.isAdmin) {
      await user.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      res.status(200).json({
        message: "Profil modifié !",
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


// Supprimer un profil 

exports.deleteProfile = async (req, res, next) => {
  try {
    const user = await user.findOne({ where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }
    if (user.id !== res.locals.userId && res.locals.isAdmin) {
      res.status(403).json({
        message: "Not authorized",
      });
      return;
    }
    await user.destroy();
    res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


// get all profils 

exports.getAllMessagesProfile = (req, res, next) => {
  Messages.findAll({
    order: [["updatedAt", "DESC"]],
    attributes: [
      "id",
      "iduser",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
    where: { iduser: res.locals.userId },
    include: [{ model: user, attributes: ["firstname", "lastname"] }],
  })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};