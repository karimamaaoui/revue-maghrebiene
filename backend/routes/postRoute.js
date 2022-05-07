const express =require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../model/post");
const cors = require("cors");
router.use(cors());

const util = require("util");
const maxSize = 2 * 1024 * 1024;

/***
 *  two options here:
 
    destination : determines folder to store the uploaded files
    filename : determines the name of file inside the destination folder
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter=(req, file,cb)=>{
  if(file.mimetype==="image/png"){
    cb(null,true);
  }
  else{
    cb(null,false);

  }
}

//multer module to initialize middleware
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },

});

router.route('/add').post(uploadFile.single('files'),async (req, res) => {

  console.log("req file single", req.files.fileArticle.name);

  req.files.fileArticle.mv('./uploads/' + req.files.fileArticle.name);
  data.push({
    name: req.files.fileArticle.name,
    mimetype: req.files.fileArticle.mimetype,
    size: req.files.fileArticle.size
  });
  console.log("data", data)
  const titre=req.body.titre;

  const articleFile = await new Post({
    fileArticle: data,
    titre
  });
  articleFile
    .save(articleFile)
    .then(data => {
      console.log("data file ", articleFile.fileArticle.length)
      res.send(data);
    });
  console.log("file article", articleFile);

});

module.exports = router;