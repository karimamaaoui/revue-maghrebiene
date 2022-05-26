const multer = require("multer");


const Post =require('../model/post')



const addPost =async (req, res) => {

    console.log("req file single");
    if (!req.files) {
      return res.status(400).json({ message: "no file uploaded" })
    }
    try {
  
    let datas=[]
    req.files.imagename.mv('./uploads/' + req.files.imagename.name);
  
    datas.push({
      name: req.files.imagename.name,
      mimetype: req.files.imagename.mimetype,
      size: req.files.imagename.size,
    });
  
    const title = req.body.title;
    const pathFile = req.body.pathFile;
    
    console.log("data", req.body.pathFile)
    
    const articleFile = await new Post({
      imagename: datas,
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
  
  };
  
  
module.exports = {
    addPost
  }