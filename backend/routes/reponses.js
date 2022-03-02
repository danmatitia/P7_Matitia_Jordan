const express = require("express");
const router = express.Router();
const reponsesCtrl = require("../controllers/reponses");
const auth = require("../middleware/auth");

router.get("/:id/reponses", auth, reponsesCtrl.getAllReponses);
router.post("/:id/reponses/", auth, reponsesCtrl.createReponses);
router.delete("/:id/reponses/:id", auth, reponsesCtrl.deleteReponses);

module.exports = router;