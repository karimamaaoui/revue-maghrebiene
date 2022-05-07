const express = require('express');
const router = express.Router();
const authController = require('../controllers/registerController');
const cors = require("cors");
router.use(cors());
const verifySignUp =require('../middleware/verifySignUp');
const verifyRoles =require("../middleware/verifyRoles")
const User= require('../model/user')


router.post("/register",authController.handleRegister);

router.get('/verify/:id/:token',authController.handleVerifyWithToken);

module.exports = router;

