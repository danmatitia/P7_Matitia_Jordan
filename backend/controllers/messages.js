const { Messages, user } = require("../models");
const fs = require("fs-extra");

// CREATE messages

exports.createMessage = (req, res, next) => {
  if (req.body.title === "" || req.body.content === "") {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }
  Messages.create({
    iduser: res.locals.userId,
    title: req.body.title,
    content: req.body.content,
    /*le front end ne connaissant pas l'url de l'image il faut le définir manuellement*/
    image:
      req.body.content && req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
  })
    .then(() => res.status(201).json({ message: "Message enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};


//GETALL messages

exports.getAllMessages = (_req, res) => {
  //Récupère la list des posts du plus récents aux plus ancien avec User.firstname et User.lastname à partir de la clé étrangère idUser.
  Messages.findAll({
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "iduser",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
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

// poster un messages
exports.getOneMessages = async (req, res, next) => {
  try {
    const messages = await Messages.findOne({
      attributes: [
        "id",
        "iduser",
        "title",
        "content",
        "image",
        "createdAt",
        "updatedAt",
      ],
      where: { id: req.params.id },
    });
    if (!messages) {
      res.status(404).json({
        message: "post not found",
      });
      return;
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

// DELETE messages

exports.deleteMessages = async (req, res, next) => {
  try {
    const messages = await Messages.findOne({ where: { id: req.params.id } });
    if (!messages) {
      res.status(404).json({
        message: "Message not found",
      });
      return;
    }

    if (messages.iduser !== res.locals.userId && !res.locals.isAdmin) {
      res.status(403).json({
        message: "Not authorized",
      });
      return;
    }

    if (messages.image !== null) {
      const filename = messages.image.split("/images/")[1];
      await fs.unlink(`images/${filename}`);
    }

    await messages.destroy();
    res.status(200).json({
      message: "Post deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};