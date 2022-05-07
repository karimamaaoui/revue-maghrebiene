const express = require('express');
const router = express.Router();
const typesController = require('../../controllers/typesController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');

router.post("/add", typesController.createType);
router.put("/update/:id", verifyToken.verifyUserToken, verifyRoles.isReader, typesController.updateType);
router.delete("/delete/:id", verifyToken.verifyUserToken, verifyRoles.isReader, typesController.deleteType);
router.get("/types", verifyToken.verifyUserToken, typesController.retrieveAllTypes);



module.exports = router;

