const CryptoJs =require("crypto-js");
const jwt=require("jsonwebtoken");
const db = require("../routes/Roles");
const Role = db.role;
const User =require('../model/user');
const verifySignUp =require('../middleware/verifySignUp');
//const verifyRoles =require("../middleware/verifyRoles")



const generateAccessToken = (id, roles) => {
  const payload = {
      id,
      roles,
  };
  return jwt.sign(payload, process.env.SECRET_Key, { expiresIn: "24h" });
};

 

const handleLogin=([verifySignUp.checkDuplicateUsernameOrEmail], async (req,res)=>{
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
      const roleuser=userrole.name;

      const userOnline = await User.findByIdAndUpdate(
        {_id:user._id},
         $set={status : "online",});
 
 
        await userOnline.save();
      return res.json({ token ,user,roleuser });
  } catch (error) {
    
      console.log(error);

      return res.status(400).json({ message: error });
  }

  });
  
  module.exports = { handleLogin };