const express =require("express");
const router = express.Router();
const multer = require("multer");
const View = require("../model/View");
const cors = require("cors");
router.use(cors());

const postController = require('../controllers/viewController');
const verifyRoles = require('../middleware/verifyRole');
const verifyToken = require('../middleware/verifyToken');

router.get("/add/:id",verifyToken.verifyUserToken, postController.addView);
router.get("/get/:id",verifyToken.verifyUserToken, postController.addView);


// router.route('/add',verifyToken.verifyUserToken).get(async (req, res) => {
//   console.log("req file single");
//     console.log('req.decoded.id',req.decoded.id)

//   try {
//     let visitors = await Post.findOne({name: 'localhost'})
//     if(visitors == null) {
          
//       // Creating a new default record
//       const beginCount = new Post({
//           name : 'localhost',
//           count : 1,
//           viewBy: req.decoded.id
//       })

//       // Saving in the database
//       beginCount.save()

//       // Sending thee count of visitor to the browser
//       res.send(`<h2>Counter: `+1+'</h2>')

//       // Logging when the app is visited first time
//       console.log("First visitor arrived")
//   }
//   else{
          
//     // Incrementing the count of visitor by 1
//     visitors.count += 1;

//     // Saving to the database
//     visitors.save()

//     // Sending thee count of visitor to the browser
//     res.send(`<h2>Counter: `+visitors.count+'</h2>')

//     // Logging the visitor count in the console
//     console.log("visitor arrived: ",visitors.count)
// }
//   } catch (err) {
//     console.log("inside file catch  ");

//     res.status(500).send({
//       message:
//         err.message
//     });
//   }

// });


// router.route('/get').get(async (req, res) => {
//   console.log("req file single");

//   try {

 
//   const files =  await Post.find({}).sort({ _id: 1 });
//   return res.status(200).json(files);

//   } catch (err) {
//     console.log("inside file catch  ");

//     res.status(500).send({
//       message:
//         err.message
//     });
//   }

// });

module.exports = router;