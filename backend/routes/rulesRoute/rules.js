const express = require('express');
const router = express.Router();
const rulesController = require('../../controllers/rulesController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');


router.post("/add",verifyToken.verifyUserToken, verifyRoles.isReader,rulesController.createRules);
router.get("/getallrules",verifyToken.verifyUserToken, verifyRoles.isReader,rulesController.retrieveAllRules);

router.put("/update/:id", verifyToken.verifyUserToken, verifyRoles.isReader, rulesController.updateRule);
router.delete("/delete/:id", verifyToken.verifyUserToken, verifyRoles.isReader, rulesController.deleteRule);

router.get("/getrule/:id",verifyToken.verifyUserToken,  rulesController.getOneRule);

module.exports = router;

