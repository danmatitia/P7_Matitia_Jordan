const { Reponses, user } = require("../models");


//CREATE reponses 
exports.createReponses = (req, res, next) => {
  if (!req.body.reponses ) {
    return res.status(400).json({ error: "Merci de remplir le champ." });
  }
  Reponses.create({
    iduser: res.locals.userId,
    idmessages: req.params.id,
    reponses: req.body.reponses,
  })
    .then(() => res.status(200).json({ message: "Réponses envoyé !" }))
    .catch((error) => res.status(500).json(error));
};

// get all reponses 

exports.getAllReponses = (req, res, next) => {
  Reponses.findAll({
    where: { idmessages: req.params.id },
    order: [["updatedAt", "DESC"]],
    include: [{ model: user, attributes: ["firstName", "lastName", "id"] }],
  })
    .then((reponses) => {
      res.status(200).json(reponses);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//delete reponses 

exports.deleteReponses = async (req, res, next) => {
  try {
    const reponses = await Reponses.findOne({ where: { id: req.params.id} });
    if (!reponses) {
      res.status(404).json({
        message: "message not found",
      });
      return;
    }

    if (reponses.iduser !== res.locals.userId && !res.locals.isAdmin) {
      res.status(403).json({
        message: "Not authorized",
      });
      return;
    }
    await reponses.destroy();
    res.status(200).json({
      message: "réponse deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};