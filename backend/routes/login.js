const express = require('express');
const router = express.Router();
const authController = require('../controllers/loginController');
const cors = require("cors");
router.use(cors());


router.post("/login",authController.handleLogin)   ;

module.exports = router;

