const multer = require("multer");
const View = require("../model/View");


const Post =require('../model/View')



const addView =async (req, res) => {
    console.log("req file single");
    console.log('req.decoded.id', req.decoded )
  
    try {
      let visitors = await View.findOne(req.params.id)
      console.log('vis',visitors)
      if(visitors == "") {
            
        // Creating a new default record
        const beginCount = new View({
            name : 'localhost',
            count : 1,
            viewBy: req.decoded.id,
            article:req.params.id
        })
  
        // Saving in the database
        beginCount.save()
  
        // Sending thee count of visitor to the browser
        res.send(`<h2>Counter: `+beginCount+'</h2>')
  
        // Logging when the app is visited first time
        console.log("First visitor arrived")
    }
    else{
            
      // Incrementing the count of visitor by 1
      visitors.count += 1;
  
      // Saving to the database
      visitors.save()
  
      // Sending thee count of visitor to the browser
      res.send(`<h2>Counter: `+visitors.count+'</h2>')
  
      // Logging the visitor count in the console
      console.log("visitor arrived: ",visitors.count)
  }
    } catch (err) {
      console.log("inside file catch  add view",req.decoded);
  
      res.status(500).send({
        message:
          err.message
      });
    }
  
  };
  
const getAllViews = (async (req, res) => {
  
      console.log('inside get All Views');
      try {
         
        view = await (await View.find({}).populate('viewBy', ['username', 'email']).populate('article'));
  
        return res.status(200).json(view);
  
  
      } catch (err) {
        return res.status(500).json({ msg: err });
      }
    });
  
  
  
module.exports = {
  addView,
  getAllViews
  }