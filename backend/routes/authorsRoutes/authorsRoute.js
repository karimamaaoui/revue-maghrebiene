const express = require('express');
const router = express.Router();
const authorController = require('../../controllers/authorController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');


router.get("/get",verifyToken.verifyUserToken,verifyRoles.isAuthor, authorController.getAuthor);

router.put("/updateauthor",verifyToken.verifyUserToken,verifyRoles.isAuthor, authorController.updateAuthor);


module.exports = router;

