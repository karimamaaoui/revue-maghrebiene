const util = require("util");
const multer = require("multer");
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

}).single("multiple_files");

//util.promisify() to make the exported middleware object can be used with async-await.
const uploadFileMiddleware = util.promisify(uploadFile);

const uploadMultiple = multer({ 
  storage: storage,
  limits: { fileSize: maxSize },

 }).array('multiple_files',2);

 
 const uploadMultipleFileMiddleware =util.promisify(uploadMultiple);

module.exports = 
  {uploadFileMiddleware,uploadMultipleFileMiddleware};