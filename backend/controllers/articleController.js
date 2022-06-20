const Article = require('../model/Article');
const uploadFile = require("../middleware/uploadImage");
const { forEach, keysIn, ary } = require('lodash');
const User = require('../model/user');
const Type = require('../model/Type');
//const { body, body } = require('express-validator');
const Role = require('../model/role');
const path = require('path')
const fs = require("fs");
const PDFDocument = require("pdfkit");


const getFiles = async (req, res) => {
  article = await Article.findById(req.params.id).populate('typeArticle', ['label']);
  res.status(200).send(article);
};


/*** create multiple files */

const createArticle = async (req, res) => {
  console.log("inside file ");


  if (!req.files) {
    return res.status(400).json({ message: "no file uploaded" })
  }
  try {
    console.log("inside file try  ");

    let data = [];
    let oneFile = req.files.contenu;

    console.log("one file", oneFile.length)

    if (oneFile.length >= 2) {
      forEach(keysIn(req.files.contenu), (key) => {
        let file = req.files.contenu[key];
        console.log("filees est multiple ", file)

        //move photo to uploads directory
        file.mv('./uploads/' + file.name);
        //push file details
        data.push({
          name: file.name,
          mimetype: file.mimetype,
          size: file.size
        });
      });

      const newFile = new Article({
        contenu: data,


      });
    
      newFile
        .save(newFile)
        .then(data => {
          res.send(data);
        })

    }
    else {

      console.log("req file single");

      req.files.contenu.mv('./uploads/' + req.files.contenu.name);
      data.push({
        name: req.files.contenu.name,
        mimetype: req.files.contenu.mimetype,
        size: req.files.contenu.size
      });

      let rule=[]
    rule.push(
      req.body.rulesChecked
    )
      console.log("RULE 99", rule)


      const title = req.body.title;
      const abstract = req.body.abstract;
      const keyWords = req.body.keyWords;
      const published = req.body.published;
      const status = req.body.status;
      const typeArticle = req.body.typeArticle;
      const attributesAticle = req.body.attributesAticle;
      const userId = await User.findById(req.decoded.id);
      const like = req.body.like;
      const authors = userId.id;
      const comments = req.body.comments;
      const view = req.body.view;
      const pathFile = req.body.pathFile;
      const filepassword = req.body.filepassword;
      const imagename = req.files.imagename.name;

      const articleFile = await new Article({
        contenu: data,
        typeArticle,
        title,
        abstract,
        keyWords,
        published,
        status,
        authors,
        attributesAticle,
        like,
        comments,
        rulesChecked :req.body.rulesChecked,
        view,
        pathFile,
        imagename,
        filepassword,
      });

      let ids = []
      const cursor = data;
      cursor.forEach((doc) => {
        ids.push(
          doc.name,
        );
      });
      const fileName = ids[0];
      const fileName2 = ids[1];

      // console.log('article1', fileName)
      // console.log('article2', fileName2)

      const directoryPath = path.join(__dirname, "../uploads/");
      // console.log("directoryPath from downolad", filepassword)
      const options = {
        userPassword: filepassword
      }

      const doc = new pdfkit(options);
      let dataBuffer = fs.readFileSync(directoryPath + fileName);
      console.log('directoryPath +fileName 161', dataBuffer)

      PdfParse(dataBuffer).then(function (data) {

        const filetext = data.text
        doc.text(filetext)
        doc.pipe(fs.createWriteStream(directoryPath + fileName));
        doc.end()
      })



      if (ids.length > 1) {
        forEach(keysIn(ids), (key) => {
          let file = ids[key];
          console.log("file", file)
        })
      }
      console.log("data rulesChecked 179 ", req.body.rulesChecked)
     // console.log("data rule ", rule)

      // const rules = await Rule.find( {} );
      // console.log("data rule ", rules)

      articleFile
        .save(articleFile)
        .then(data => {
          // const ruleRespected = Rule({
          //  // rule: rule,
          //   article: articleFile._id,
          //   checked: true

          // })
          // ruleRespected.save()

          console.log("data file ", articleFile)
          
          res.send(data);
        });



    }
  } catch (err) {
    console.log("inside file catch  ");

    res.status(500).send({
      message:
        err.message
    });


  }
};


//GET ALL
const getAllArticle = (
  async (req, res) => {

    const currentPage = req.query.currentPage;
    const total = await Article.countDocuments({});
    console.log("total ddd", total)

    const query = req.query.new;
    const limit = 5;
    const skip = (currentPage - 1) * limit;

    console.log('inside get list of files', skip);


    try {

      articles = await Article.find({ typeArticle: req.query.types })
        .populate('typeArticle', ['label'])
        .populate('like', ['username', 'email'])
        .populate('authors')
        .populate('comments')
        .populate('rulesChecked')
        .populate('view')
        

        .sort({ createdAt: -1 }).limit(limit).skip(skip);

      console.log('eeeeeeeeeeeeeeeeeeee', articles)

      const rulesChecked=await Article
      .aggregate([
            { "$lookup": {
               "from": "Article",
               "let": { "rulesChecked": "$rulesChecked" },
             "pipeline": [
                { "$match": { "$expr": { "$in": [ "$_id", "$$rulesChecked" ] } } }
               ],
             "as": "output"
          }}
       ])

      if (!articles.length > 0) {
        articles = await Article.find({}).populate('typeArticle', ['label']).populate('like', ['username', 'email'])
          .populate('authors')
          .populate('comments')
          .populate('rulesChecked')


          .sort({ createdAt: -1 }).limit(limit).skip(skip);

      }
      return res.status(200).json(articles);


    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  });

const getAllArticleByAttribute = (
  async (req, res) => {

    const currentPage = req.query.currentPage;
    const total = await Article.countDocuments({});
    console.log("fsfdgdskfgfhkdsgfkdsgffbd", total)

    const query = req.query.new;
    const limit = 5;
    const skip = (currentPage - 1) * limit;


    console.log('inside get list of getAllArticleByAttribute', skip);
    try {
      articles = await Article.find({ attributesAticle: req.params.attribut })
        .populate('attributesAticle', ['label'])
        .populate('typeArticle', ['label'])
        .populate('authors', ['username', 'email'])
        .sort({ createdAt: -1 }).limit(limit).skip(skip);

      console.log('getAllArticleByAttribute', req.params.attribut)


      return res.status(200).json(articles);


    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  });


const uploadArticleFile = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "no file uploaded" })
  }
  else {

    let data = [];
    let file = req.files.contenu;

    console.log("one file", req.files.contenu.length)
    file.mv('./uploads/' + file.name);
    data.push({
      name: file.name,
      mimetype: file.mimetype,
      size: file.size
    });
    // console.log("data",data)
    const articleFile = await new Article({
      contenu: data,


    });

    if (articleFile.contenu.length >= 1) {
      res.json({ message: "only one file" })
    }
    else {
      res.json({ message: `more then  one fil ${articleFile.contenu.length}` })

    }
  }

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

const retrieveAllFiles = (async (req, res) => {
  const query = req.query.new;
  console.log('inside get list of Article');
  try {
    const files = await query ? await Article.find().sort({ _id: -1 }).limit(10) : await Article.find().sort({ _id: 1 });
    return res.status(200).json(files);

  } catch (err) {
    return res.status(500).json({ msg: err });

  }
});
//downloaded an article
const download = async (req, res) => {

  //const fileName = req.params.name;
  const _id = req.params.id;
  const file = Article.findById(_id)
    .then(data => {
      let ids = []
      const cursor = data.contenu;


      cursor.forEach((doc) => {
        ids.push(
          doc.name,


        );
      });
      console.log("data.contenu.name", (ids))
      const fileName = ids[0];
      const fileName2 = ids[1];
      // console.log('article',article)
      const directoryPath = path.join(__dirname, "../uploads/");

      res.download(directoryPath + `${fileName}`, fileName, (err) => {


        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          }).clone().catch(function (err) { console.log(err) })

        }

      })

    })
};

const pdfkit = require('pdfkit')

const readFiles = async (req, res, next) => {

  //const fileName = req.params.name;
  const id = req.params.id;
  try {

    await Article.findById(id)
      .then(data => {

        if (!data) {
          res.status(404).send({
            message: `Cannot download Article with id=${id}. Maybe Article was not found!`
          });
        }

        else {

          let ids = []
          const cursor = data.contenu;

          cursor.forEach((doc) => {
            ids.push(
              doc.name,
              doc.mimetype


            );
          });

          const directoryPath = path.join(__dirname, "../uploads/")
          const fileName = ids[0];
          let dataBuffer = fs.readFileSync(directoryPath + fileName);
          //        console.log('directoryPath +fileName', dataBuffer)

          PdfParse(dataBuffer).then(function (data) {

            // console.log('data text', data.text);
            //          console.log('data text', data.numpages);
            //           console.log('data text', data.info);

            res.status(200).send(data)

          }
          )

          //PdfParse()

          //  console.log('article', fileName)
          // const directoryPath = path.join(__dirname, "../uploads/"+fileName);
          // console.log("directoryPath from downolad", directoryPath)

          // fs.readFile(directoryPath, {dencoding: 'Buffer'}, function (err, files) {
          //   if (err) {
          //     res.status(500).send({
          //       message: "Unable to scan files!",
          //     });
          //   }
          //   else {
          //     console.log("fileInfo", files);
          //     res.status(200).send(files)
          //   }

          // })

          //   fs.readFile(directoryPath,'utf-8', function (err, files) {
          //   if (err) {
          //     res.status(500).send({
          //       message: "Unable to scan files!",
          //     });
          //   }
          //   else {
          //      res.writeHead(200, { "Content-type": `application/pdf` });
          //    res.end(files)
          //   //   console.log(files)

          //     //  res.status(200).send(files);

          //   }
          // }
          // );

          // let fileSync = fs.readdirSync(directoryPath);
          // console.log('fileSync: ', fileSync)

          // let pdfParser = new PDFParse(fileSync)

          // //let pdfParser=new PDFParse (this,1);
          // pdfParser.loadPDF(directoryPath + fileName)
          // console.log('Parse: ', pdfParser)
          // console.log('PDF pages: ', pdfParser.numpages)

          // console.log('File content: ', pdfParser.info)

        }
      }
      )
  } catch (err) {
    throw erreur;
  }
};

//GET ARTICLE STATS

const getStats = (async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);
  // const monthsArray=[
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December'

  // ];

  try {
    const data = await Article.aggregate(
      [{

        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
      ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});



const getListFiles = async (req, res) => {
  try {
    const cursor = await Article.find({});
    let fileInfos = [];

    await cursor.forEach((doc) => {
      fileInfos.push({
        id: doc._id,
        contenu: doc.contenu

      });
    });


    return res.status(200).send(fileInfos);
  }
  catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}



const singleFileUpload = async (req, res, next) => {
  try {
    if (!req.files) {

      res.send({
        status: false,
        message: 'No file uploaded'
      });
    }

    uploadFile.uploadFileMiddleware(req, res);

    console.log("req file", file.mimetype);

    file.mv('./uploads/' + file.name);


    const file = new Article({
      contenu: req.files.contenu
    });
    await file.save()
    console.log("file", file)
    res.status(200).send("file uploaded successfully")
  }
  catch (error) {
    res.status(400).send(error.message)
  }
}

const updateArticle = async (req, res) => {
  console.log('inside find update article');
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const datas = []


  const id = req.params.id;



  if (!req.files) {
    Article.findByIdAndUpdate(id, {
      $set: {
        title: req.body.title,
        bio: req.body.bio,
        abstract: req.body.abstract,
        keyWords: req.body.keyWords,
        published: req.body.published,
        status: req.body.status,
        typeArticle: req.body.typeArticle,
        attributesAticle: req.body.attributesAticle,
        // imagename:req.files.imagename.name,
        // pathFile:req.body.pathFile,

      },
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
        } else res.send(
          { message: "Article was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Article with id=" + id
        });
      });
  }

  else {
    if (req.files.imagename) {
      Article.findByIdAndUpdate(id, {
        $set: {
          title: req.body.title,
          abstract: req.body.abstract,
          keyWords: req.body.keyWords,
          published: req.body.published,
          status: req.body.status,
          typeArticle: req.body.typeArticle,
          attributesAticle: req.body.attributesAticle,
          imagename: req.files.imagename.name,
          pathFile: req.body.pathFile,

        },
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
          } else res.send(
            { message: "Article was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Article with id=" + id
          });
        });
    }


    else {
      if (req.files.contenu) {


        req.files.contenu.mv('./uploads/' + req.files.contenu.name);
        datas.push({
          name: req.files.contenu.name,
          mimetype: req.files.contenu.mimetype,
          size: req.files.contenu.size
        });

        Article.findByIdAndUpdate(id, {
          $set: {
            title: req.body.title,
            bio: req.body.bio,
            abstract: req.body.abstract,
            keyWords: req.body.keyWords,
            published: req.body.published,
            status: req.body.status,
            typeArticle: req.body.typeArticle,
            attributesAticle: req.body.attributesAticle,
            // imagename:req.files.imagename.name,
            // pathFile:req.body.pathFile,
            contenu: datas

          },
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
            } else res.send(
              { message: "Article was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: err   
            })
            ;
            console.log('err',err)
          });
      }


      else {
        if (req.files) {


          req.files.contenu.mv('./uploads/' + req.files.contenu.name);
          datas.push({
            name: req.files.contenu.name,
            mimetype: req.files.contenu.mimetype,
            size: req.files.contenu.size
          });

          Article.findByIdAndUpdate(id, {
            $set: {
              title: req.body.title,
              bio: req.body.bio,
              abstract: req.body.abstract,
              keyWords: req.body.keyWords,
              published: req.body.published,
              status: req.body.status,
              typeArticle: req.body.typeArticle,
              attributesAticle: req.body.attributesAticle,
              imagename: req.files.imagename.name,
              pathFile: req.body.pathFile,
              contenu: datas

            },
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
              } else res.send(
                { message: "Article was updated successfully." });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Article with id=" + id
              });
              console.log('err',err)

            });
        }

      }
    }

  }
}



const getArticleSearch = (async (req, res) => {
  console.log("key", req.params.key)

  try {
   
    const article = await Article.find(
      {
        "$or": [
          { "title": { $regex: req.params.key } },
          { "content": { $regex: req.params.key } },
          { "abstract": { $regex: req.params.key } },
          { "keyWords": { $regex: req.params.key } },
          { "status": { $regex: req.params.key } },

        ]
      }
    );
    res.send(article)


  } catch (err) {
    return res.status(500).json({ msg: err });
  }

})



const convertFile = (async (req, res) => {
  const id = req.params.id;
  const file = Article.findById(id)
    .then(data => {
      console.log("dififgfgfgfg", data)
      if (!data) {
        res.status(404).send({
          message: `Cannot download Article with id=${id}. Maybe Article was not found!`
        });
      }
      else {
        // res.send(data.contenu);
        let ids = []
        const cursor = data.contenu;
        cursor.forEach((doc) => {
          ids.push(
            doc.name,
          );
        });
        console.log("data.contenu.name", (ids))
        const fileName = ids[0];
        const fileName2 = ids[1];

        console.log('article1', fileName)
        console.log('article2', fileName2)

        const directoryPath = path.join(__dirname, "../uploads/");
        console.log("directoryPath from downolad", directoryPath)

        if (ids.length > 1) {
          forEach(keysIn(ids), (key) => {
            let file = ids[key];
            console.log("file", file)
          })
        }
        doc = new PDFDocument
        doc.pipe(fs.createWriteStream(directoryPath + `${fileName}.pdf`))
        doc.image(directoryPath + fileName, {
          fit: [500, 400],
          align: 'center',
          valign: 'center'
        });
        if (ids.length > 1) {
          doc.addPage().image(directoryPath + fileName2, {
            fit: [500, 400],
            align: 'center',
            valign: 'center'
          })
        }
        doc.end()
      }
    })

})


//add like
const addLike = (async (req, res) => {

  const article = await Article.findById(req.params.id);
  console.log('articl',article.like.includes(req.decoded.id))
  if (!article.like.includes(req.decoded.id)) {
    await article.updateOne({ $push: { like: req.decoded.id } },

      {
        new: true
      })

      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Article with . Maybe Article was not found!`
          });
        } else res.send({ message: "Article was updated successfully." });
      })

      .catch(err => {
        res.status(500).send({
          message: "Error updating Article with id="
        });
      });

  }
})

const addView = (async (req, res) => {


  try {
    const user = await User.findOne({ _id: req.decoded.id });
    // console.log("inside get user",user)

    let visi = await Article.findById({ _id: req.params.id }).populate('view')
    console.log('req.parsm', req.params.id)

    const visiteur = visi.view.map((a) => {
      return a.name
    })
    console.log('visiteur', visiteur)

    const countt = visi.view.map((a) => {
      return a.count
    })
    console.log('count', (countt.length === 0))
    if (countt.length === 0) {
      let c = countt
      const data = {
        name: 'localhost',
        count: c + 1,
        viewBy: user,
        article: req.params.id

      }
      console.log('c', (c))

      // Creating a new default record
      const beginCount = await Article.findByIdAndUpdate(
        { _id: req.params.id },
        $set = {
          view: data
        })

      console.log('beginCount 1', beginCount)

      // Saving in the database
      beginCount.save()

      // Sending thee count of visitor to the browser
      res.send(`<h2>Counter: ` + countt + '</h2>')

      // Logging when the app is visited first time
      console.log("First visitor arrived")
    }
    else {

      // Incrementing the count of visitor by 1
      let c = countt[0] + 1
      const data = {
        name: 'localhost',
        count: c,
        viewBy: user,
        article: req.params.id

      }
      console.log('codff', data)
      // Creating a new default record
      const beginCount = await Article.findByIdAndUpdate(
        { _id: req.params.id },

        $push = {
          view: data
        })

      console.log('beginCount 2', beginCount)

      // Saving in the database
      beginCount.save()


      // Saving to the database

      // Sending thee count of visitor to the browser
      res.send(`<h2>Counter 2: ` + c + '</h2>')

      // Logging the visitor count in the console
    }
  } catch (err) {
    console.log("inside file  ");

    res.status(500).send({
      message:
        err.message
    });
  }

});



const getAllViews = (
  async (req, res) => {

    console.log('inside get All Views');
    try {
      articles = await (await View.find({}).populate('view', ['username', 'email']));

      return res.status(200).json(articles);


    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  });



//add comments
const addComment = (async (req, res) => {

  const comment = {
    text: req.body.text,
    postedBy: req.decoded.id
  }
  Article.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment }
  }, {
    new: true
  })
    //.populate("postedBy","_id name")

    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with . Maybe Article was not found!`
        });
      } else res.send({ message: "Article was updated successfully." });

    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id="
      });
    });


})

//add review 
const addReview = (async (req, res) => {

  const editorReview = {
    text: req.body.text,
    postedBy: req.decoded.id,
    article:req.params.id
  }
  Article.findByIdAndUpdate(req.params.id, {
    $push: { editorReview: editorReview }
  }, {
    new: true
  })

    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with . Maybe Article was not found!`
        });
      } else res.send({ message: "Article was updated successfully." });

    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id="
      });
    });


})

  //pulishArticle
  const publishArticle = (async (req, res) => { 
    
    try{
      const article =await Article.findById(req.params.id);
      console.log("Article",article.authors)
      const user =await User.findById(article.authors);
      console.log("Article",user.email)
     
      const editorValidation = {
   
      articleDecision:req.body.articleDecision,
     }


  if(editorValidation.articleDecision ==='false' )
{
  Article.findByIdAndUpdate(req.params.id, {
    $set: { editorValidation: editorValidation, status:'rejected',published:false },

  }, {
    new: true
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with . Maybe Article was not found!`
        });
      } else res.send({ editorValidation });

    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id="
      });
    });


}
  else if(editorValidation.articleDecision ==='true' )

{
  Article.findByIdAndUpdate(req.params.id, {
    $set: { editorValidation: editorValidation,published:true,status:'accepted' },

  }, {
    new: true
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with . Maybe Article was not found!`
        });
      } else res.send({ editorValidation }
        
        );
        const mailOptions = {
          from: "scongresses@gmail.com",
          to: user.email,
          subject: "Your  Article Is Accepted ",
          html: `<p>See more <a href="http://localhost:3000"><a> </p>`,

      };
      console.log(req.body.email)
      transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
          }
          else {
              console.log("msg sent");

          }
      })

    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id="
      });
    });

  }}
    catch (err) {
      res.status(500).json({ msg: "Unauthorized" });
    }
  
}
)


// Get One

//GET 
const getArticle = (async (req, res) => {
  console.log('inside find article by id');

  try {
       const rulesChecked=await Article
      .aggregate([
            { "$lookup": {
               "from": "Article",
               "let": { "rulesChecked": "$rulesChecked" },
             "pipeline": [
                { "$match": { "$expr": { "$in": [ "$_id", "$$rulesChecked" ] } } }
               ],
             "as": "output"
          }}
       ])

    const article = await Article.findById({ _id: req.params.id })
    .populate('authors')
    .populate('comments.postedBy', ['email', 'username'])
    .populate('attributesAticle')
    .populate('typeArticle',['label'])
    .populate('like')
    .populate('rulesChecked');
    
    res.status(200).json(article);


  } catch (err) {
    res.status(500).json({ msg: "Unauthorized" });
  }


});



const PdfParse = require('pdf-parse');
const { transporter } = require('../middleware/transporter');
const { findById } = require('../model/Article');



module.exports = {
  addLike,
  getArticle,
  getAllArticleByAttribute,
  createArticle,
  uploadArticleFile,
  retrieveAllFiles,
  getListFiles,
  singleFileUpload,
  getAllArticle,
  getStats,
  download,
  getFiles,
  deleteArticle,
  updateArticle,
  getArticleSearch,
  readFiles,
  convertFile,
  addComment,
  addView,
  addReview,
  getAllViews,
  publishArticle
}