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

router.route('/add').post(async (req, res) => {
  console.log("req file single");

  if (!req.files) {
    return res.status(400).json({ message: "no file uploaded" })
  }
  try {

  let datas=[]
  req.files.imagename.mv('./uploads/' + req.files.imagename.name);

  // datas.push({
  //   name: req.files.imagename.name,
  //   mimetype: req.files.imagename.mimetype,
  //   size: req.files.imagename.size,
  // });

  const title = req.body.title;
  const pathFile = req.body.pathFile;
  const imagename=req.files.imagename.name;
  console.log("data", req.body.pathFile)
  
  const articleFile = await new Post({
    imagename,
    pathFile, 
    title
  });
  
  console.log("file article", articleFile);
  articleFile
    .save(articleFile)
    .then(data => {
      res.send(data);
    })
  } catch (err) {
    console.log("inside file catch  ");

    res.status(500).send({
      message:
        err.message
    });
  }

});


router.route('/get').get(async (req, res) => {
  console.log("req file single");

  try {

 
  const files =  await Post.find({}).sort({ _id: 1 });
  return res.status(200).json(files);

  } catch (err) {
    console.log("inside file catch  ");

    res.status(500).send({
      message:
        err.message
    });
  }

});

module.exports = router;