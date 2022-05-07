const express = require('express');
const router = express.Router();
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');

const articleController=require('../../controllers/articleController');

router.post("/addArticle",verifyToken.verifyUserToken,articleController.createArticle);

router.put("/update/:id",verifyToken.verifyUserToken,[verifyRoles.isReader || verifyRoles.isAuthor],articleController.updateArticle);

router.delete("/delete/:id",verifyToken.verifyUserToken,[verifyRoles.isReader || verifyRoles.isAuthor],articleController.deleteArticle);

router.get("/getallarticles",verifyToken.verifyUserToken,articleController.getAllArticle);

//router.post('/filter/search',verifyToken.verifyUserToken, articleController.getArticleSearch);

router.get('/filter/:key',verifyToken.verifyUserToken, articleController.getArticleSearch);


router.get('/random',verifyToken.verifyUserToken, articleController.getRandomArticle);


router.post('/search', articleController.searchByQueryType);

module.exports = router;
