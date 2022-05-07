/*const db = require("../routes/Roles");
const Role = db.role;
const User =require ('../model/user');


 
const checkRolesExisted = (req, res, next) => {
    if (req.body.role) {
      for (let i = 0; i < req.body.role.length; i++) {
        if (!Role.includes(req.body.roles[i])) {
          console.log(req.body.role)
          res.status(400).send({
            message: `Failed! Role ${req.body.role[i]} does not exist!`
          });
          return;
        }
      }
    }
    next();
  };

  const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.body.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}
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
      User.findById(req.userId).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("role is ",req.body.name)
     //   console.log("role is ",user.roles )
  
        Role.find(
          {
            _id: { $in: user.role }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            for (let i = 0; i < roles.length; i++) {
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
  

module.exports = {
    checkRolesExisted: checkRolesExisted,
    verifyRoles: verifyRoles,
    isAuthor:isAuthor,
    isReader:isReader
  };*/