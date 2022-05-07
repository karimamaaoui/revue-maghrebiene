const express = require('express');
const router = express.Router();
const authorController = require('../../controllers/authorController');
const cors = require("cors");
router.use(cors());


router.get("/get", authorController.getAuthor);



module.exports = router;

