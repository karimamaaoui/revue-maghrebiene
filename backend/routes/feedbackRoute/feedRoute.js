const express = require('express');
const router = express.Router();
const feedbackController = require('../../controllers/feedbackController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');

router.post("/add",verifyToken.verifyUserToken  ,feedbackController.createFeedback);

router.get("/getFeedback",feedbackController.getAllFeedback);

//router.delete("/delete/:id",verifyToken.verifyUserToken,verifyRoles.isReader,demandController.deleteDemand);

module.exports = router;

