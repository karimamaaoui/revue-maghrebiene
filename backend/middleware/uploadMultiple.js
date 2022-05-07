
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

const uploadMultiple = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
  
   }).array('multiple_files');
  
   
   const uploadMultipleFileMiddleware =util.promisify(uploadMultiple);
  

   module.exports = uploadMultipleFileMiddleware;  