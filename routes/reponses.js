const express = require("express");
const router = express.Router();
const reponsesCtrl = require("../controllers/reponses");
const auth = require("../middleware/auth");

router.get("/:messagesId/reponses", auth, reponsesCtrl.getAllReponses);
router.post("/:messagesId/reponse/", auth, reponsesCtrl.createReponses);
router.delete("/:messagesId/reponse/:id", auth, reponsesCtrl.deleteReponses);

module.exports = router;