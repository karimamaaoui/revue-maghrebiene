const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema;

const Article = ArticleSchema({

    title: {
        type: String,
        required: true,
        max: 55,
        minlength:2 
    },


    abstract: {
        type: String,
        require:true,
        max: 1024,
        minlength: 6
    },

    content: {
        type: String,
        required: true,
        max: 1024,
        minlength: 4
    },


    keyWords: {
        type: [String],
        required:true
    },

    abbreviations: {
        type: String,
        required:true

    },


    status: {
        type: String,
        enum: ['rejected', 'accepted', 'loading'],
        default: 'loading'
    },

    published: {
        type: Boolean,
        default: false
    },

    authors: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },


    typeArticle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,

    }],

    attributesAticle:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attributes',
        required: true,

    }],


    articleFiles: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
    }
    ],
    rulesChecked: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rules',
    }]


},
    { timestamps: true }
);

//add index to article model for search filter
Article.index({title:"text"})

module.exports = mongoose.model("Article", Article);