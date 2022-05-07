const User =require ('../model/user');
const db = require("../routes/Roles");
const Role = db.role;


const isReader = (req, res, next) => {
    User.findById(req.decoded.id).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
    console.log("user id is ",req.decoded.id)
    console.log("role id is ",user.roles)
    
  
  Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            
            console.log("role name is ",roles[i].name)
  
            if (roles[i].name === "Reader") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Reader Role!" });
          return;
        }
      );
    });
  };
  
  
const isAuthor = (req, res, next) => {
    User.findById(req.decoded.id).exec((err, user) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
    //console.log("user id is ",req.decoded.id)
  //  console.log("role id is ",user.roles)
    
  
  Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            
           // console.log("role name is ",roles[i].name)
  
            if (roles[i].name === "Author") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Author Role!" });
          return;
        }
      );
    });
  };
  
  module.exports={
    isReader: isReader,
    isAuthor:isAuthor
}
