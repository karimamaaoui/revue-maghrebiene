const Files = require('../model/Files');
const uploadFile = require("../middleware/uploadImage");
const { forEach, keysIn, ary } = require('lodash');
const User = require('../model/user');
const Type = require('../model/Type');
//const { body, body } = require('express-validator');
const Role = require('../model/role');
const path = require('path')
const fs = require("fs");
const PDFDocument = require("pdfkit");


const getFiles =async (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");
  console.log("directoryPath", directoryPath)
 const filesss= await Files.findById(req.params.id);
  console.log('fdfddfdf',filesss)
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    else { res.status(200).send(files); }


  });
};

// create file 
const createFile = async (req, res) => {

  const data = []
  uploadFile.uploadFileMiddleware(req, res);
  if (!req.files) {

    res.send({
      status: false,
      message: 'No file uploaded'
    });
  }

  let file = req.files.multiple_files;

  //console.log("req file 20", file);

  /*
  if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg") {
    return res.status(500).send({ message: "file type invalid" });

  }/
  else {*/
  // console.log("req file name", req.files);

  file.mv('./uploads/' + file.name);
  data.push({
    name: file.name,
    mimetype: file.mimetype,
    size: file.size
  });
  // console.log("data",data)
  const articleFile = await new Files({
    multiple_files: data,
  });
  articleFile
    .save(articleFile)
    .then(data => {
      res.send(data);
    });
}

/*** create multiple files */

const multipleUpload = async (req, res) => {
  console.log("inside file ");


  if (!req.files) {
    return res.status(400).json({ message: "no file uploaded" })
  }
  try {
    console.log("inside file try  ");

    let data = [];
    let oneFile = req.files.multiple_files;

    console.log("one file", oneFile.length)

    if (oneFile.length >= 2) {
      forEach(keysIn(req.files.multiple_files), (key) => {
        let file = req.files.multiple_files[key];
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

      const newFile = new Files({
        multiple_files: data,


      });
      /*  res.send({
          status: true,
          message: 'Files are uploaded',
          data: newFile
        });*/

      newFile
        .save(newFile)
        .then(data => {
          res.send(data);
        })

    }
    else {
      //uploadFile.uploadFileMiddleware(req, res);

      console.log("req file single");

      req.files.multiple_files.mv('./uploads/' + req.files.multiple_files.name);
      data.push({
        name: req.files.multiple_files.name,
        mimetype: req.files.multiple_files.mimetype,
        size: req.files.multiple_files.size
      });
      //    console.log("data", data)
      const title = req.body.title;
      const bio = req.body.bio;
      const abstract = req.body.abstract;
      const keyWords = req.body.keyWords;
      const abbreviations = req.body.abbreviations;
      const published = req.body.published;
      const status = req.body.status;
      const typeArticle = req.body.typeArticle;
      const attributesAticle = req.body.attributesAticle;
      const userId = await User.findById(req.decoded.id);
      const like = req.body.like;
      const authors = userId.id;
      const comments = req.body.comments;
      const rulesChecked = req.body.rulesChecked;
      const view = req.body.view;
      const pathFile = req.body.pathFile;
      const imagename=req.files.imagename.name;
     

      //   const readerRole = await Role.findOne({name:'Reader'});
      // // console.log("readerRole is ",readerRole);

      //   const readerUser=await User.findOne({roles:readerRole})


      //   console.log("readerUser is ",readerUser);


      const articleFile = await new Files({
        multiple_files: data,
        typeArticle,
        title,
        bio,
        abstract,
        keyWords,
        abbreviations,
        published,
        status,
        authors,
        attributesAticle,
        like,
        comments,
        rulesChecked,
        view,
        pathFile,
        imagename
      });

      let ids = []
      const cursor = data;
      cursor.forEach((doc) => {
        ids.push(
          doc.name,
        );
      });
      console.log("data.multiple_files.name", (ids))
      const fileName = ids[0];
      const fileName2 = ids[1];

      console.log('article1', fileName)
      console.log('article2', fileName2)

      const directoryPath = path.join(__dirname, "../uploads/");
      //console.log("directoryPath from downolad", directoryPath)

      if (ids.length > 1) {
        forEach(keysIn(ids), (key) => {
          let file = ids[key];
          console.log("file", file)
        })
      }
      const rules = await Rule.find({ _id: req.body.rulesChecked });

      if (fileName.includes('pdf') || fileName.includes('docx')) {
        articleFile
          .save(articleFile)
          .then(data => {
            const ruleRespected = RuleRespected({
              rule: rules,
              article: articleFile._id,
              checked: true

            })
            ruleRespected.save()

            console.log("data file ", articleFile)
            res.send(data);
          });

      }

      else {
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
        const type = await Type.findById(req.body.typeArticle);
        const typearti = type.label;
        const rules = await Rule.find({ _id: req.body.rulesChecked });

        articleFile
          .save(articleFile)
          .then(data => {
            // console.log("data file ", articleFile)
            const ruleRespected = RuleRespected({
              rule: rules,
              article: articleFile._id,
              checked: true

            })
            ruleRespected.save()

            res.send(data);
          });

      }
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
    const total = await Files.countDocuments({});
    console.log("fsfdgdskfgfhkdsgfkdsgffbd", total)

    const query = req.query.new;
    const limit = 5;
    const skip = (currentPage - 1) * limit;

    console.log('inside get list of files', skip);
    try {
      // const articles = await query ? await Files.find().populate('typeArticle', ['label']) : await Files.find().populate('typeArticle', ['label']).
      //   sort({ createdAt: -1 }).limit(limit).skip(skip);
      articles = await Files.find({ typeArticle: req.query.types }).populate('typeArticle', ['label']).sort({ createdAt: -1 }).limit(limit).skip(skip);

      console.log('eeeeeeeeeeeeeeeeeeee', articles)


      if (!articles.length > 0) {
        articles = await Files.find({}).populate('typeArticle', ['label']).sort({ createdAt: -1 }).limit(limit).skip(skip);

      }
      return res.status(200).json(articles);


    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  });

const getAllArticleByAttribute = (
  async (req, res) => {

    const currentPage = req.query.currentPage;
    const total = await Files.countDocuments({});
    console.log("fsfdgdskfgfhkdsgfkdsgffbd", total)

    const query = req.query.new;
    const limit = 5;
    const skip = (currentPage - 1) * limit;


    console.log('inside get list of getAllArticleByAttribute', skip);
    try {
      articles = await Files.find({ attributesAticle: req.params.attribut })
                                  .populate('attributesAticle', ['label'])
                                  .populate('typeArticle', ['label'])
                                  .populate('authors', ['username','email'])
                                  .sort({ createdAt: -1 }).limit(limit).skip(skip);

      console.log('getAllArticleByAttribute', req.params.attribut)


      // if (!articles.length > 0) {
      //   articles = await Files.find({}).populate('attributesAticle', ['label']).sort({ createdAt: -1 }).limit(limit).skip(skip);

      // }
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
    let file = req.files.multiple_files;

    console.log("one file", req.files.multiple_files.length)
    file.mv('./uploads/' + file.name);
    data.push({
      name: file.name,
      mimetype: file.mimetype,
      size: file.size
    });
    // console.log("data",data)
    const articleFile = await new Files({
      multiple_files: data,


    });

    if (articleFile.multiple_files.length >= 1) {
      res.json({ message: "only one file" })
    }
    else {
      res.json({ message: `more then  one fil ${articleFile.multiple_files.length}` })

    }
  }

}

//delete article

const deleteArticle = async (req, res) => {
  console.log('inside  delete  article');
  try {
    await Files.findByIdAndRemove(req.params.id);
    res.status(201).json('Article has been deleted...');

  } catch (err) {
    res.status(500).json(err);
  }

};


//GET ALL

const retrieveAllFiles = (async (req, res) => {
  const query = req.query.new;
  console.log('inside get list of Files');
  try {
    const files = await query ? await Files.find().sort({ _id: -1 }).limit(10) : await Files.find().sort({ _id: 1 });
    return res.status(200).json(files);

  } catch (err) {
    return res.status(500).json({ msg: err });

  }
});
//download an article
const download = async (req, res) => {

  //const fileName = req.params.name;
  const _id = req.params.id;
  const file = Files.findById(_id)
    .then(data => {
      // if (!data) {
      //   res.status(404).send({
      //     message: `Cannot download Article with id=${id}. Maybe Article was not found!`
      //   });
      // }
      // else {
      //   // res.send(data.multiple_files);
      let ids = []
      const cursor = data.multiple_files;


      cursor.forEach((doc) => {
        ids.push(
          doc.name,


        );
      });
      console.log("data.multiple_files.name", (ids))
      const fileName = ids[0];
      const fileName2 = ids[1];
      // console.log('article',article)
      const directoryPath = path.join(__dirname, "../uploads/");
      console.log("directoryPath from downolad", fileName);

      if (fileName.includes('pdf') || fileName.includes('docx')) {
        res.download(directoryPath + `${fileName}`, fileName, (err) => {
          if (err) {
            res.status(500).send({
              message: "Could not download the file. " + err,
            }).clone().catch(function (err) { console.log(err) })

          }
        })
      }

      else {

        res.download(directoryPath + `${fileName}.pdf`, fileName, (err) => {
          if (err) {
            res.status(500).send({
              message: "Could not download the file. " + err,
            }).clone().catch(function (err) { console.log(err) })

          }
        })


      }
    })
};

const PDFParse = require('pdf2json');
const Rule = require('../model/Rule');
const RuleRespected = require('../model/ruleRespected');

const readFiles = async (req, res) => {

  //const fileName = req.params.name;
  const id = req.params.id;
  const file = Files.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot download Article with id=${id}. Maybe Article was not found!`
        });
      }
      else {
        // res.send(data.multiple_files);
        let ids = []
        const cursor = data.multiple_files;


        cursor.forEach((doc) => {
          ids.push(
            doc.name,
            doc.mimetype


          );
        });

        // console.log("data.multiple_files.name", (ids))

        const fileName = ids[0];
        //console.log('article', fileName)
        const ext = ids[1];
        // console.log('dfdfdkfdfldflfhnf', ext);

        //  console.log('article', fileName)
        const directoryPath = path.join(__dirname, "../uploads/"+fileName);
        console.log("directoryPath from downolad", directoryPath)

        fs.readFile(directoryPath, {dencoding: 'Buffer'}, function (err, files) {
          if (err) {
            res.status(500).send({
              message: "Unable to scan files!",
            });
          }
          else {
            console.log("fileInfo", files);
            res.status(200).send(files)
          }

        })
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
    const data = await Files.aggregate(
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
    const cursor = await Files.find({});
    let fileInfos = [];

    await cursor.forEach((doc) => {
      fileInfos.push({
        id: doc._id,
        multiple_files: doc.multiple_files

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

    /*  const file={
        fileName: req.files.multiple_files.name,
        fileType:req.files.multiple_files.mimetype,
        fileSize: fileSizeFormatter(req.files.multiple_files.size,2) // 0.00
      }*/
    console.log("req file", file.mimetype);

    file.mv('./uploads/' + file.name);


    const file = new Files({
      multiple_files: req.files.multiple_files
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

  const datas = []

  // console.log("one file", req.files.multiple_files.length)
  // console.log("data",data)

  req.files.multiple_files.mv('./uploads/' + req.files.multiple_files.name);
  datas.push({
    name: req.files.multiple_files.name,
    mimetype: req.files.multiple_files.mimetype,
    size: req.files.multiple_files.size
  });

  //const body=req.body;
  const id = req.params.id;

  Files.findByIdAndUpdate(id, {
    $set: {
      title: req.body.title,
      bio: req.body.bio,
      abstract: req.body.abstract,
      keyWords: req.body.keyWords,
      abbreviations: req.body.abbreviations,
      published: req.body.published,
      status: req.body.status,
      typeArticle: req.body.typeArticle,
      attributesAticle: req.body.attributesAticle,
      multiple_files: datas
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
      } else res.send({ message: "Article was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });

}



const getArticleSearch = (async (req, res) => {
  console.log("key", req.params.key)

  try {
    // const search = req.query;
    // var condition = search ? { title: { $regex: new RegExp(search.title), $options: "i" } } : {};

    // Article.find(condition)
    //   .then(data => {
    //     res.send(data)
    //   })

    const article = await Files.find(
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



const convertFile = (async (req, res) => {
  const id = req.params.id;
  const file = Files.findById(id)
    .then(data => {
      console.log("dififgfgfgfg", data)
      if (!data) {
        res.status(404).send({
          message: `Cannot download Article with id=${id}. Maybe Article was not found!`
        });
      }
      else {
        // res.send(data.multiple_files);
        let ids = []
        const cursor = data.multiple_files;
        cursor.forEach((doc) => {
          ids.push(
            doc.name,
          );
        });
        console.log("data.multiple_files.name", (ids))
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

  const article = await Files.findById(req.params.id);
  if (!article.like.includes(req.decoded.id)) {
    await article.updateOne({ $push: { like: req.decoded.id } },


      // Files.findByIdAndUpdate(req.params.id,{
      //   $push: {like:req.decoded.id}
      // },
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

  Files.findByIdAndUpdate(req.params.id, {
    $push: { view: req.decoded.id }
  },
    {
      new: true
    })

    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update View with . Maybe Article was not found!`
        });
      } else res.send({ message: `View was updated successfully.${data.view.length}` });
    })

    .catch(err => {
      res.status(500).send({
        message: "Error updating View with id="
      });
    });


})



//add comments
const addComment = (async (req, res) => {

  const comment = {
    text: req.body.text,
    postedBy: req.decoded.id
  }
  Files.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment }
  }, {
    new: true
  })
    //.populate("comments.postedBy","_id name")
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


// Get One

//GET 
const getArticle = (async (req, res) => {
  console.log('inside find article by id');

  try {
    /*   const user= await User.findById({user:req.decoded.id } );
       console.log("inside get user",user)
       console.log("inside get user id ",req.decoded.id)
       */
    const article = await Files.findById(req.params.id);
    console.log("inside get user", article)

    res.status(200).json(article);


  } catch (err) {
    res.status(500).json({ msg: "Unauthorized" });
  }


});

// filter by date
var moment = require('moment');
const { file } = require('pdfkit');

const fitlerByDate = (async (req, res) => {

  try {

    // var dateTimeTofilter = new Date() - week;
    // console.log("dddddddddddddddddddddddddddddddddddddddddddddddddd datetimetofilter",dateTimeTofilter);

    // var filter = { "createdAt": { $lte: dateTimeTofilter } };

    // console.log("dddddddddddddddddddddddddddddddddddddddddddddddddd",filter);

    // var dateTimeTofilter = moment().subtract(1, 'year');
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',dateTimeTofilter)
    // var filter = {
    //     "createdAt": {
    //         $gte: new Date(dateTimeTofilter._d)
    //     }
    // };
    //  console.log("dddddddddddddddddddddddddddddddddddddddddddddddddd",filter);

    // or $gte- depends on time windows
    var query = req.query.createdAt;
   // console.log('eeeeeeeeeeee',    moment(query).format("YYYY-MM-DD")    )


    // let createdAt=moment(createdAt)

      articles = await Files.find({createdAt:query})
      console.log('created at', articles.map((art)=>{
        const dat= new Date(moment(art.createdAt).format("YYYY-MM-DD"))
        console.log('eeeeeeeeeeee', typeof(query))
        console.log('dat', typeof(dat))

        return query===dat
      }))
      
      return res.status(200).json(articles);
          //articles = await Files.find({ createdAt: query })
    // .find({"OrderDateTime":{ $gte:ISODate("2019-02-10"), $lt:ISODate("2019-02-21") }


    // let start = moment(req.query.createdAt)
    //  console.log('eeeeeeeeeeee', (start))

    // const query = { createdAt: { $gte: new Date("2022-05-06T15:11:44.909Z") } }
    // console.log(query) //outputs { createdAt: { '$gte': '2018-01-01T02:00:00.000Z' } }
    // const result = await Files.find(query)
    //  articles= Files.aggregate(
    //     [
    //       {
    //         $project:
    //           {
    //             birthYear: { $year: "$createdAt" }
    //           }
    //       }

    //       // {
    //       //   "$project":{
    //       //       "year_month_day": {"$dateToString": { "format": "%Y-%m-%d", "date": "$tDate", "timezone": "America/Chicago"}}
    //       //   },
    //     ]
    //   )

    //   return res.status(200).json(articles);
    // articles = await (await Files.find({ query })).map((c) => {
    //   const datecreare = moment(c.createdAt).format("YYYY-MM-DD")
    //   if (datecreare === query){
        
    //     return c.createdAt
    //   }
    // });
    // console.log('title',articles)

    // return res.status(200).json(articles);
    

  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});


module.exports = {
  addLike,
  getArticle,
  getAllArticleByAttribute,
  createFile,
  multipleUpload,
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
  fitlerByDate
}