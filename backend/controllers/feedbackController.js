const Feedback = require('../model/FeedBack');
const User = require('../model/user');


const createFeedback = async (req, res) => {
    console.log('inside  create  feedback');

    const userId = await User.findOne({ _id: req.decoded.id });
    //  console.log('inside  create  Demand',userId);
    if (!userId) {
        res.status(404).json({ msg: 'User does not exist' });
    }
    const star = req.body.star;
    const message = req.body.message;


    const feedback = await new Feedback({
        star: star,
        message: message,
        user: userId.id,
    });
           
    console.log('inside ', feedback);



    // Save attribute in the database
    feedback
        .save(feedback)
        .then(data => {
            // if(data.includes())
            console.log("data feedback", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the feedback."
            });
        })

};



const getAllFeedback = (
    async (req, res) => {
        console.log('inside get list of feedback');
        try {
            const feedback = await Feedback.find().populate('user', ['username']).sort({ _id: -1 }).limit(10);
           // console.log('inside ', feedback);

            return res.status(200).json(feedback);

        } catch (err) {
            return res.status(500).json({ msg: err });
        }
    });



module.exports = {
    createFeedback,
    getAllFeedback
}
