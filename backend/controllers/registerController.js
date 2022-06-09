const CryptoJs =require("crypto-js");
const jwt=require("jsonwebtoken");
//const verifySignUp =require('./verifySignUp');
const db = require("../routes/Roles");
const Role = db.role;
const User =require('../model/user');
//email handler
const nodemailer=require("nodemailer");
//unique string
const {v4: uuidv4}=require("uuid");
//transporter 
const transporter =require('../middleware/transporter')
const user = require("../model/user");
var expressValidator = require('express-validator');


require('dotenv').config();


    
//testing success

transporter.transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
    }
  });
  
//Register user
const handleRegister= async (req,res)=>{

  
    console.log('inside the register');
    const user =new User({
        username:req.body.username,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_Key).toString(),
        email: req.body.email,
        role :req.body.role,
        isVerified: false,
        firstname: req.body.lastname,
        lastname: req.body.lastname,
        university: req.body.university,
        placeofpractice: req.body.placeofpractice,
        newMessages:req.body.newMessages
    });

    //req.checkBody('password', 'Invalid possword').notEmpty().len(3, 30);

    console.log("role",req.body.role)

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: "user already exist" });
        return;
      }
      const payload = {
        user: { id: user._id },
      };
    // show user id
      console.log(user._id);
      //generate jwt
      jwt.sign(
        payload,
        process.env.SECRET_Key ,
        {
          expiresIn: '1m',
        },
        async (err, token) => {
          if (err) throw err;
      //send verfication Email
      //mail options
      const mailOptions={
        from: "scongresses@gmail.com",
        to: req.body.email,
        subject:"Verify your email",
        html: `<p>verify account <a href="http://localhost:5000/api/auth/verify/${user._id}/${token}"> here </a> to procced. </p>`,
        };
      console.log(req.body.email)
      transporter.transporter.sendMail(mailOptions,function(error,response){
        if(error){
          console.log(error);
        }
        else{
          console.log("msg sent");
        
      }
      })})
        
      if (req.body.role) {
        Role.find(
          {
            name: { $in: req.body.role }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "User" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [role._id];
          console.log(user.role)
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            
            res.send({ message: user});
          });
        });
      }
    })

};

//verify  account with email
const handleVerifyWithToken=async (req, res) => {
  const _id=req.params.id;

  try {
  
    let user = await User.findById(_id);
    console.log("view id", user._id);
    const token=req.params.token;
    console.log("view token", token);
    
    if (!user) {
      res.status(404).json({ msg: 'User does not exist' });
    }
    if (!token)return res.status(400).send("Invalid link");
    //await User.updateOne({ _id: user._id, isVerified: true });
    const isVerified=true;
    await User.findOneAndUpdate(
      {_id : req.params.id},
      { $set: {isVerified: isVerified}});

    await user.save();
    res.json({ msg: 'Confirmed', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err});
  }
}

  module.exports = { handleRegister,handleVerifyWithToken };