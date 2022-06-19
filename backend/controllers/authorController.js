const Author = require('../model/Author');
const User = require('../model/user');
const jwt = require("jsonwebtoken");



//GET 
const getAuthor = (async (req, res) => {
    console.log('inside find user by id');

    try {
        const author = await Author.find({ author: req.decoded.id }).populate('author', ['email', 'username', '_id', 'firstname', 'lastname'])
        res.status(200).json(author);


    } catch (err) {
        res.status(500).json({ msg: "Unauthorized" });
    }


});

const generateToken = (id,user) => {
    return jwt.sign({ id ,user}, process.env.SECRET_Key, {
      expiresIn: "30m",
    });
  };
const updateAuthor = (async (req, res) => {
    const user = await User.findById(req.decoded.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
     
        const updatedUser = await user.save();
     //   console.log("updatedUser",updatedUser)

        //const auth=  await author.save();

        const token = generateToken(updatedUser, user);

        const author = await Author.findOneAndUpdate(
            {author:req.decoded.id},
            {$set: {
                university:req.body.university,
                placeofpractice:req.body.placeofpractice
            }}
            );
        
        return res.json({ token, user,author });

    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});


module.exports = {
    getAuthor,
    updateAuthor
};