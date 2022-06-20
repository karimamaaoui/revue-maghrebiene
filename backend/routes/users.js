const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const cors = require("cors");
router.use(cors());
const verifyToken = require('../middleware/verifyToken');
const User =require('../model/user')
const verifyRoles = require('../middleware/verifyRole');
const uploadFile = require("../middleware/uploadImage");

router.get("/getnew",verifyToken.verifyUserToken,userController.getNewArrivals);

router.get("/find",verifyToken.verifyUserToken,userController.getUser);
router.get("/getAllUsers",verifyToken.verifyUserToken,verifyRoles.isAdmin,userController.getAllUsers);

router.patch("/updatepassword",verifyToken.verifyUserToken,userController.updatePassword);
router.patch("/update/",verifyToken.verifyUserToken,userController.updateUser);

router.patch('/upload-image/',verifyToken.verifyUserToken,  userController.changePictureProfile);

router.post('/requestPasswordReset',  userController.forgotPassword);
router.post('/restPassword',  userController.sendTemporaryPassword);

router.post("/logout", userController.logOut);

router.put("/addToAuthor/:id", userController.AddToAuthor);
router.delete("/delete/:id",verifyToken.verifyUserToken,verifyRoles.isAdmin, userController.deleteUser);

router.get('/filter/:key',verifyToken.verifyUserToken, userController.getUserSearch);

router.get('/getuser/:id',verifyToken.verifyUserToken, userController.getUserByID);

router.get('/getrole',verifyToken.verifyUserToken, userController.getUserRole);
router.put("/adminupdate/:id",verifyToken.verifyUserToken, userController.getUserAndUpdate);


module.exports = router;
