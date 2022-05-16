const express = require('express');
const router = express.Router();
const favoriteController = require('../../controllers/favoriteController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');


router.post("/add",verifyToken.verifyUserToken  ,favoriteController.createFavorite);
router.get("/",verifyToken.verifyUserToken,favoriteController.getAllFavorite);
router.delete("/delete/:id",verifyToken.verifyUserToken,favoriteController.deleteFavorite);

module.exports = router;

