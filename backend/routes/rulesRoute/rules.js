const express = require('express');
const router = express.Router();
const rulesController = require('../../controllers/rulesController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');


router.post("/add",rulesController.createRules);
router.get("/getallrules",rulesController.retrieveAllRules);



module.exports = router;

