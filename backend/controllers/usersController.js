//mongodb user model
const User = require('../model/user');
const CryptoJs = require("crypto-js");
const verifyToken = require('../middleware/verifyToken');
const { transporter } = require('../middleware/transporter');
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const uploadFile = require("../middleware/uploadImage");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const Author = require('../model/Author');
const db = require("../routes/Roles");
const Demand = require('../model/Demand');
const Role = db.role;



//delete user
const deleteUser = async (req, res) => {
    console.log('inside  delete  user');
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(201).json('Type has been deleted...');
  
    } catch (err) {
      res.status(500).json(err);
    }
  
  };
  
//GET 
const getUser = (async (req, res) => {
    console.log('inside find user by id');

    try {
        /*   const user= await User.findById({user:req.decoded.id } );
           console.log("inside get user",user)
           console.log("inside get user id ",req.decoded.id)
           */
        const user = await User.findOne(req.decoded);
        console.log("inside get user", user)
        console.log("inside get user id ", req.decoded)

        const { password, ...info } = user._doc;
        console.log(info.role)
        res.status(200).json(info);


    } catch (err) {
        res.status(500).json({ msg: "Unauthorized" });
    }


});

//GET ALL

const getAllUsers = (verifyToken.verifyUserToken,
    async (req, res) => {
        const query = req.query.new;
        console.log('inside get list of users');
        try {
            const users = await query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
            return res.status(200).json(users);

        } catch (err) {
            return res.status(500).json({ msg: err });
        }
    });
    const generateToken = (id,user) => {
        return jwt.sign({ id ,user}, process.env.SECRET_Key, {
          expiresIn: "30m",
        });
      };
// UPDATE
/*
const updateUser = (async(req, res) => {
    //  console.log("inside update user")
    const id = req.decoded;
    // console.log(req.body)
    //  console.log(id)
    /*   try{  
            User.findOneAndUpdate(
              {user : req.decoded},
              {$set: req.body,updatedAt: Date.now()},
              (err,result)=>{
               
                  const msg ={
                      msg: "user successfully updated",
       
                  };
       
                  return res.json(msg);
              }   
          )
      }catch (err) {
          console.error(err);
          res.status(500).json({ msg: err});
        }    
        
      */
        
      /*  const user= await User.findOne(req.decoded);
        console.log("user",user);

        if (user)
        {
            user.firstname=req.body.firstname || user.firstname;
            user.username=req.body.username || user.username;
            user.lastname=req.body.lastname || user.lastname;
            
        

        const updatedUser =await user.save();
        res.json({
            firstname:updatedUser.firstname,
            lastname:updatedUser.lastname,
            username:updatedUser.username
        })

        const token = generateToken(req.decoded);
        console.log("token ",token)
        return res.json({ token });

     /*   User.findOneAndUpdate(req.decoded,
            req.body).then(result => {
                console.log(result)

                res.status(200).json(result)

            }
            )
            const payload = {
                user: { id: user._id },
            };
            // show user id
            console.log("payload", payload);


            jwt.sign(
                payload,
                process.env.SECRET_Key,
                {
                    expiresIn: '1m',
                },*/
            
     /*       }
    else  {
        console.error(err);
        res.status(404).json(err.message);
    }

});*/
/*
const updateUser = (async (req, res) => {
    const user = await User.findById(req.decoded.id);
  
    console.log("user")
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
      
       await User.findOneAndUpdate(req.decoded, {
         $set :req.body
      });
      const token= generateToken(user);
      console.log(token)
        
      return res.json({ token ,user });
      
    }
    );
*/

    const updateUser = (async (req, res) => {
        const user = await User.findById(req.decoded.id);
      
        if (user) {
          user.username = req.body.username || user.username;
          user.firstname = req.body.firstname || user.firstname;
          user.lastname = req.body.lastname || user.lastname;
        //   user.university = req.body.university || user.university;
        //   user.placeofpractice = req.body.placeofpractice || user.placeofpractice;
       
          const updatedUser = await user.save();
      
       /*   res.json({
            username: updatedUser.username,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            token: generateToken(updatedUser),
          });*/
        const  token=generateToken(updatedUser,user);

          return res.json({ token ,user });

        } else {
          res.status(404);
          throw new Error("User Not Found");
        }
      });



// UPDATE PASSWORD
const updatePassword = ((req, res) => {
    console.log("inside update password")
    try {
        req.body.password = CryptoJs.AES.encrypt(
            req.body.password,
            process.env.SECRET_Key)
            .toString();
        console.log("pass 1", req.body.password)
        User.findOneAndUpdate(
            req.decoded ,
            { $set: { password: req.body.password, updatedAt: Date.now() } },
        ).then(result => {
            console.log(req.decoded)
            res.status(200).json(result)
        })
    } catch (err) {
        console.error(err);
        res.status(404).json(err.message);
    }


});


//send password reset email
const sendResetEmail = ({ _id, email }, redirectUrl, res) => {
    const resetString = uuidv4() + _id;

    //First we clear all existing reset records
    PasswordReset.deleteMany({ userId: _id })
        .then(result => {
            //mail options
            const mailOptions = {
                from: "scongresses@gmail.com",
                to: email,
                subject: "Password Reset",
                html: `<p> We heard that you lost the password.</p><p>Don't worry, use the link below to reset it</p> 
            <p>This link <b>expires in 60 minutes</b>.</p> Press 
            <a href=${redirectUrl + "/" + _id + "/" + resetString}> here </a> to procced. </p>`,
            };
            //hash the reset string
            const saltRounds = 10;
            bcrypt.hash(resetString, saltRounds)
                .then(hashedResetString => {
                    //set values in password reset collection
                    const newPasswordRest = new PasswordReset({
                        userId: _id,
                        resetString: hashedResetString,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 360000
                    });
                    console.log("nesw rest ", newPasswordRest)
                    newPasswordRest
                        .save()
                        .then(() => {
                            transporter.sendMail(mailOptions)
                                .then(() => {

                                    res.json({
                                        status: "PENDING",
                                        message: "Password reset email sent",

                                    })
                                })
                        })
                        .catch(error => {
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "Couldn't save password reset data !",
                            })
                        })
                })
                .catch(error => {
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "An error occured while hashng the password reset data!",
                    });

                })
        }).catch(error => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "Clearing existing password reset records failed ",
            })

        })
}
// add user's picture 
const changePictureProfile = ((req, res, next) => {
    console.log("inside add photo ")
   // const user = User.findById(req.decoded.id);   
  
    try {
        const user =  User.findOne(req.decoded);
        console.log("inside get user", req.decoded.id)
     
        
          uploadFile.uploadFileMiddleware(req, res);
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
        else {

            //Use the name of the input field (i.e. "profilePic") to retrieve the uploaded file
            let profilePic = req.files.profilePic;
            console.log("connect",req.decoded.id)
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            profilePic.mv('./uploads/' + profilePic.name);
            User.findOneAndUpdate(
                { _id: req.decoded.id },

                { $set: { profilePic: profilePic.name, updatedAt: Date.now() } },
                (err, result) => {
                    if (err) return res.status(500).json({ msg: err });
                    const msg = {
                        msg: "user successfully updated",
                        // username: req.params.username,

                    };
                    console.log(" add photo ", profilePic.name)


                    return res.json(msg);
                }
            )
        }



    } catch (error) {
        res.status(500).send(error.message);

    }
});


const logOut = async (req, res) => {
    console.log("insidie logout ")
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
}

// forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    await User.find({ email })
        .then((result) => {
            if (result.length > 0) {
                const user = result[0]._id;

                console.log("user id", req.body);
                console.log('show data inside reset request ', user)

                const payload = {
                    user: { id: user._id },
                };
                // show user id
                console.log("payload", payload);


                jwt.sign(
                    payload,
                    process.env.SECRET_Key,
                    {
                        expiresIn: '1m',
                    },

                    async (err, resetToken) => {
                        if (err) throw err;
                        await User.findOneAndUpdate({ email: email },
                            { $set: { resetToken: resetToken } })

                        const mailOptions = {
                            from: "scongresses@gmail.com",
                            to: email,
                            subject: "Password Reset",
                            html: `<p>verify account <a href="http://localhost:5000/api/auth/${user._id}/${resetToken}"> here </a> to procced. </p>`,
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                res.status(404).send({
                                    error: 'The email address ' + req.body.email +
                                        ' is not associated with any account. Double-check your email address and try again.'
                                });
                            } else {
                                console.log('Email sent: ' + info.response);
                                res.status(200).send({ result });
                            }
                        }
                        );
                    }
                )
            }
        })
};

const sendTemporaryPassword = async (req, res) => {
    console.log(req.body)
    var randomstring = Math.random().toString(36).slice(-8);
    let salt = crypto.randomBytes(16).toString('base64');
    const pass = CryptoJs.AES.encrypt(randomstring, process.env.SECRET_Key).toString()
    let hash = crypto.createHmac('sha512', salt).update(randomstring).digest("base64");

    let password = salt + "$" + hash;
    let user;
    const { email } = req.body;
    console.log("find by id")
    await User.find({ email })
        .then((result) => {
            if (result.length > 0) {

                console.log("user id", req.body);
                user = result[0]._id;
                console.log('show data inside reset request ', user)
                const payload = {
                    user: { id: user._id },
                };
                console.log(payload);
                jwt.sign(
                    payload,
                    process.env.SECRET_Key,
                    {
                        expiresIn: '1m',
                    },
                    async (err, token) => {
                        if (err) throw err;

                        const mailOptions = {
                            from: "scongresses@gmail.com",
                            to: email,
                            subject: 'Temporary Password',
                            html: `<h3>Your Temporary Password is '${randomstring}'\n\n'</h3>
                            <p>Please click on the following link, or paste this into your browser to complete the process: <a href="http://google.com:5000/api/login/${user._id}/${token}"> here </a> to procced. </p>`,
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                                console.log("randomstring", randomstring)
                                console.log("randomstring", pass)
                                console.log("pass 2", user._id)

                                return res.json(result);

                            }
                        })
                        await User.findOneAndUpdate(
                            { _id: user._id },
                            { $set: { password: pass } });


                    }
                )
            }
        })
}
// add user to author
const AddToAuthor = async (req, res) => {

    console.log("inside add to entity author ");
    const _id = req.params.id;
    console.log("user id", _id);

    try {

        let user = await User.findById(_id);
       // let userId = await User.findOne({ user: req.decoded.id })
       // console.log("user id from add author", user)


        if (!user) {
            res.status(404).json({ msg: 'User does not exist' });
        }
        let role = await Role.findById(user.roles);
        console.log(role)

        Role.findOne({ name: "Author" }, (err, role) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            user.role = [role._id];
           // console.log("user role role user role", user.role)

        })


        Demand.findOneAndRemove({ user: _id }, (err, demand) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            } 
            console.log("user demand", demand)
            
        })

        const isApproved = true;
        await User.findOneAndUpdate(

            { _id: req.params.id },
            {
                $pop: { "roles": 1 }

            });

        //console.log("useer role after", user.role)

        user.save();
        res.json({ msg: 'Approved', user });

        await User.findOneAndUpdate(

            { _id: req.params.id },
            {
                $push: {
                    roles:
                        [
                            user.role
                        ]

                }

            });

        console.log("user roles after updating", user._id)


        await User.findOneAndUpdate(

            { _id: req.params.id },
            {
                $set: { isApproved: isApproved }
            });
        const author = new Author({
            author: user._id,

        });
        await author.save();
      

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err });
    }




}


const getNewArrivals = (
    async (req, res) => {
  
      const total = await User.countDocuments({});
      console.log("fsfdgdskfgfhkdsgfkdsgffbd", total)
  
      const limit = 5;
  
      try {
        // const articles = await query ? await Files.find().populate('typeArticle', ['label']) : await Files.find().populate('typeArticle', ['label']).
        //   sort({ createdAt: -1 }).limit(limit).skip(skip);
      articles = await User.find({}).sort({ createdAt: -1 }).limit(limit);
  
      console.log('eeeeeeeeeeeeeeeeeeee',articles)
  
      return res.status(200).json(articles);
  
     
      } catch (err) {
        return res.status(500).json({ msg: err });
      }
    });
  
module.exports = {
    getUser,
    getAllUsers,
    updatePassword, 
    AddToAuthor,
    updateUser,
    logOut,
    forgotPassword,
    changePictureProfile,
    sendTemporaryPassword,
    deleteUser,
    getNewArrivals
};