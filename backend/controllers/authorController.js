const Author =require('../model/Author');



//GET 
const getAuthor = (async (req, res) => {
    console.log('inside find user by id');

    try {
        const author = await Author.find().populate('author',['email','username'])
        res.status(200).json(author);


    } catch (err) {
        res.status(500).json({ msg: "Unauthorized" });
    }


});

module.exports = {
     getAuthor
    };