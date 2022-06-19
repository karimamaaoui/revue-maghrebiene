const express = require('express');
const router = express.Router();
const typesController = require('../../controllers/typesController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');

router.post("/add", verifyToken.verifyUserToken, verifyRoles.isAdmin, typesController.createType);
router.put("/update/:id", verifyToken.verifyUserToken, verifyRoles.isAdmin, typesController.updateType);
router.delete("/delete/:id", verifyToken.verifyUserToken, verifyRoles.isAdmin, typesController.deleteType);
router.get("/types", verifyToken.verifyUserToken, typesController.retrieveAllTypes);

router.get("/gettype/:id", typesController.getOneType);
router.get('/filter/:key',verifyToken.verifyUserToken, typesController.getTypeSearch);


module.exports = router;

