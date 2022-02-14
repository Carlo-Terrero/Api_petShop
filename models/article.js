'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var user = require('../models/user')

var articleSchema = Schema({
    articleCategory: String,
    articleName: String,
    articleDescripcion: String,
    articleImg: String,
    stock: Number,
    precio: Number,
    comment: [ 
        {
        id: String,
        nombeUser: String,
        content: String
        }
    ]
})

module.exports = mongoose.model('Article', articleSchema);