const CryptoJs =require("crypto-js");
const jwt=require("jsonwebtoken");
const db = require("../routes/Roles");
const Role = db.role;
const User =require('../model/user');
const verifySignUp =require('../middleware/verifySignUp');
const verifyRoles =require("../middleware/verifyRoles")



const generateAccessToken = (id, roles) => {
  const payload = {
      id,
      roles,
  };
  return jwt.sign(payload, process.env.SECRET_Key, { expiresIn: "24h" });
};

//Login 
   /*const Token= jwt.sign({id: user._id },
          process.env.SECRET_Key, {expiresIn : "24h"});
  
        
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          password:user.password,
          roles: authorities,
          Token: Token
        });*/
 

const handleLogin=([verifySignUp.checkDuplicateUsernameOrEmail,
  verifyRoles.checkRolesExisted], async (req,res)=>{
   /* try {
    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        const bytes= CryptoJs.AES.decrypt(user.password,process.env.SECRET_Key);
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
  
      originalPassword !== req.body.password && res.status(401).json("wrong password or username !");
  
        const token = generateAccessToken(user._id, user.roles);
        console.log(user.roles)
        return res.json({ token });


      });
    }catch(err)
    { 
      return res.status(400).json({ message: "login error" });


    }*/
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ message: "user not found" });
      }
    const bytes= CryptoJs.AES.decrypt(user.password,process.env.SECRET_Key);
    const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
    console.log("userpass",user.password)


    if (originalPassword !== req.body.password) {
      
    console.log("show passowrd",password);
    console.log("original",originalPassword)
   // console.log(bytes);
    console.log("password from req.body",req.body.password);
      
          return res
              .status(400)
              .json({ message: "password is not correct" });
      }

      const token = generateAccessToken(user._id, user.roles);
      const userrole = await Role.findById(user.roles);

      console.log("roles is ",userrole.name);
      const roleuser=userrole.name
      return res.json({ token ,user,roleuser });
  } catch (error) {
    
      console.log(error);

      return res.status(400).json({ message: error });
  }

  });
  
  module.exports = { handleLogin };