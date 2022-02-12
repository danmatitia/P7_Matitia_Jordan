const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/messages");
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête

// ROUTES
router.get("/", auth, messagesCtrl.getAllMessages); //je vais chercher la methode get all message
router.get("/:id", auth, messagesCtrl.getOneMessages);
router.post("/", auth, multer, messagesCtrl.createMessage);
router.delete("/:id", auth, messagesCtrl.deleteMessages);

module.exports = router;


