const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema;

var reviews = new ReviewSchema({
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }],
    editor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }],
    },
    { timestamps: true }

);


const FilesSchema = mongoose.Schema;

const Files = FilesSchema({

    multiple_files: [],


    title: {
        type: String,
    },
    bio: {
        type: String,
    },
    abstract: {
        type: String,
    },

    keyWords: {
        type: [String],
        required: true
    },

    abbreviations: {
        type: String,
        required: true

    },

    filepassword: {
        type: String,
        default: ''
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }],

    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }],


    view: [{
        viewBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        name: String,
        count: Number,


    }],

    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

    }],



    status: {
        type: String,
        enum: ['rejected', 'accepted', 'loading'],
        default: 'loading'
    },

    published: {
        type: Boolean,
        default: false
    },

    typeArticle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,

    }],


    attributesAticle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attributes',
        required: true,

    }],
    read: {
        type: Boolean,
        default: false,
    },

    rulesChecked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rule',
        }],

    imagename: {
        type: String,
        required: true,

    },

    pathFile: {
        type: String,
        required: true,
    },
    
    review: [reviews]
    


},
    { timestamps: true }
);

module.exports = mongoose.model("Files", Files);