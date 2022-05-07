const Article = require('../model/Article');
const { v4: uuidv4 } = require("uuid");
const uploadFile = require("../middleware/uploadImage");
const User = require('../model/user');
const Type = require('../model/Type')
const multer = require("multer");
const Files = require('../model/Files');
const Rule = require('../model/Rule');
const RuleRespected = require('../model/ruleRespected');

//Create article
const createArticle = async (req, res) => {


  console.log('inside  create  article');
  if (!req.body.title && !req.body.content && !req.body.abstract && !req.body.articleFile) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const userId = await User.findOne(req.decoded);

  const article = await new Article({
    title: req.body.title,
    abstract: req.body.abstract,
    content: req.body.content,
    typeArticle: req.body.typeArticle,
    keyWords: req.body.keyWords,
    abbreviations: req.body.abbreviations,
    published: req.body.published,
    status: req.body.status,
    typeArticle: req.body.typeArticle,
    attributesAticle: req.body.attributesAticle,
    authors: userId.id,
    articleFiles: req.body.articleFiles,
    rulesChecked: req.body.rulesChecked
  });
  console.log("filesssssssssssssssssssssssssssssssss req.body ", req.body.articleFiles)

  const file = await Files.find({ _id: req.body.articleFiles })
  console.log("filesssssssssssssssssssssssssssssssss file", file)


  // get rule checked
  const rules = await Rule.find({ _id: req.body.rulesChecked });
  //console.log('rules', req.body.rulesChecked);
  // console.log('rules 1111', rules);

  //  console.log("type article", req.body.typeArticle)
  // get type selected
  const type = await Type.findById(req.body.typeArticle);
  const typearti = type.label;

  article.save((err, article) => {
    if (err) {

      res.status(500).send({ message: err });
      return;
    } else {

      //respected rule list
      const ruleRespected = RuleRespected({
        rule: rules,
        article: article._id,
        checked: true

      })
      ruleRespected.save()

      res.send({ message: article, typearti });

    }

  })


};

// update article
const updateArticle = async (req, res) => {
  console.log('inside find update article');
  /* try {
     const updateArticle = await Article.findOneAndUpdate(
       req.params.id,
       {
         $set: req.body,
         updatedAt: Date.now()
       },
       {
         new: true
       }
 
     );
 
     res.status(200).json(updateArticle);
   } catch (err) {
     res.status(404).json("Article not found");
   }*/
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Article.findByIdAndUpdate(id, {
    $set: req.body,
    updatedAt: Date.now()
  },
    {
      new: true
    }
  )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found!`
        });
      } else res.send({ message: "Article was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });

}


//delete article

const deleteArticle = async (req, res) => {
  console.log('inside  delete  article');
  try {
    await Article.findByIdAndRemove(req.params.id);
    res.status(201).json('Article has been deleted...');

  } catch (err) {
    res.status(500).json(err);
  }

};


//GET ALL

const getAllArticle = (
  async (req, res) => {
    const query = req.query.new;
    const limit=req.query.limit;
    const skip=req.query.skip
    console.log('inside get list of article');
    try {
      const articles = await query ? await Article.find() : await Article.find().
      sort({createdAt:-1 }).limit(limit).skip(skip);
      return res.status(200).json(articles);

    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  });



//GET ARTICLE FILTER SEARCH

// const getArticleSearch = (
//   async (req, res) => {
//     console.log('inside get list of article');
//     const { type, query } = req.body;

//     try {
//       let articles;
//       switch (type) {
//         case 'text':
//           articles = await Article.find({ $text: { $search: query } });
//           break;
//       }
//       if (!articles.length > 0) {
//         articles = await Article.find({})
//       }

//       return res.status(200).json(articles);

//     } catch (err) {
//       return res.status(500).json({ msg: err });
//     }
//   });


const getArticleSearch = (async (req, res) => {
  console.log("key", req.params.key)

  try {
    // const search = req.query;
    // var condition = search ? { title: { $regex: new RegExp(search.title), $options: "i" } } : {};

    // Article.find(condition)
    //   .then(data => {
    //     res.send(data)
    //   })

    const article = await Article.find(
      {
        "$or": [
          { "title": { $regex: req.params.key } },
          { "content": { $regex: req.params.key } },
          { "abstract": { $regex: req.params.key } },
          { "keyWords": { $regex: req.params.key } },
          { "abbreviations": { $regex: req.params.key } },
          { "status": { $regex: req.params.key } },

        ]
      }
    );
    res.send(article)


  } catch (err) {
    return res.status(500).json({ msg: err });
  }

})

// get random
const getRandomArticle = (async (req, res) => {

  console.log('inside random');
  let article;
  try {
    article = await Article.aggregate([
      {
        $sample: { size: 4 },
      },
      {
          $sort: {createdAt : -1},
      }
    ]);

    res.status(200).json(article);

  } catch (err) {
    res.status(500).json({ msg:err });
  }


});

const searchByQueryType = async (req, res) => {
	const { type, query } = req.body;

	try {
		let articles;

		switch (type) {
			case 'text':
				articles = await Article.find({ $text: { $search: query } });
				break;
		}

	
		res.json({ articles });
	} catch (err) {
		console.log(err, 'filter searchByQueryType error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};



module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticle,
  getArticleSearch,
  getRandomArticle,
  searchByQueryType

}