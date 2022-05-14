const express = require('express');
const router = express.Router();
const demandController = require('../../controllers/demandController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');

router.post("/add",verifyToken.verifyUserToken  ,demandController.createDemand);

router.get("/",verifyToken.verifyUserToken,verifyRoles.isReader,demandController.getAllDemands);

router.delete("/delete/:id",verifyToken.verifyUserToken,verifyRoles.isReader,demandController.deleteDemand);

module.exports = router;

