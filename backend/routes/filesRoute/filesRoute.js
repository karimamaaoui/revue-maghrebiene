const express = require('express');
const router = express.Router();
const filesController = require('../../controllers/filesController');
const cors = require("cors");
router.use(cors());
const verifyRoles = require('../../middleware/verifyRole');
const verifyToken = require('../../middleware/verifyToken');


//router.post("/addfile",verifyToken.verifyUserToken,verifyRoles.isReader,filesController.createFile);
//router.post("/notif",verifyToken.verifyUserToken,filesController.sendNotification);
router.post("/multiple-upload",verifyToken.verifyUserToken,verifyRoles.isAuthor, filesController.createArticle);
router.get("/retrievefiles", filesController.retrieveAllFiles);
router.get("/get/:id", filesController.readFiles);


router.get("/getview",verifyToken.verifyUserToken, filesController.getAllViews);

router.get("/convert/:id", filesController.convertFile);

router.get("/getallfiles",verifyToken.verifyUserToken,filesController.getAllArticle);
router.get("/getarticle/:attribut",verifyToken.verifyUserToken,filesController.getAllArticleByAttribute);

router.get("/stats", filesController.getStats);
router.get("/:id", filesController.download);
router.get("/getfiles/:id", filesController.getFiles);



router.put("/update/:id",verifyToken.verifyUserToken,[verifyRoles.isReader || verifyRoles.isAuthor],filesController.updateArticle);

router.delete("/delete/:id",verifyToken.verifyUserToken,[verifyRoles.isReader || verifyRoles.isAuthor],filesController.deleteArticle);
router.get('/filter/:key',verifyToken.verifyUserToken, filesController.getArticleSearch);

router.put('/like/:id',verifyToken.verifyUserToken, filesController.addLike);

router.get('/view/:id',verifyToken.verifyUserToken, filesController.addView);
router.put('/validation/:id',verifyToken.verifyUserToken, filesController.publishArticle);


router.put('/comment/:id',verifyToken.verifyUserToken, filesController.addComment);
router.put('/review/:id',verifyToken.verifyUserToken, filesController.addReview);


router.get('/getsingle/:id',filesController.getArticle);
 

module.exports = router;

