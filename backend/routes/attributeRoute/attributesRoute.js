const express = require('express');
const router = express.Router();
const attributeController = require('../../controllers/attributesController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');


router.post("/add",verifyToken.verifyUserToken,verifyRoles.isReader  ,attributeController.createAttribute);
router.put("/update/:id",verifyToken.verifyUserToken,verifyRoles.isReader ,attributeController.updateAttribute);
router.delete("/delete/:id",verifyToken.verifyUserToken,verifyRoles.isReader ,attributeController.deleteAttribute);
router.get("/attributes", verifyToken.verifyUserToken, attributeController.retrieveAllAttributes);

router.get("/getattribute/:id",verifyToken.verifyUserToken,  attributeController.getOneAttribute);


module.exports = router;

