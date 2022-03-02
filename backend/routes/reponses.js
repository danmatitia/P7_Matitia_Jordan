const express = require("express");
const router = express.Router();
const reponsesCtrl = require("../controllers/reponses");
const auth = require("../middleware/auth");

router.get("/", auth, reponsesCtrl.getAllReponses);
router.post("/:messagesId/reponses/", auth, reponsesCtrl.createReponses);
router.delete("/:messagesId/reponses/:id", auth, reponsesCtrl.deleteReponses);

module.exports = router;