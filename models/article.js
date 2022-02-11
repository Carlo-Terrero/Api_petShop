'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = require('../models/user')

var articleSchema = Schema({
    articleName: String,
    articleDescripcion: String,
    articleImg: String,
    stock: Number,
    precio: Number,
    comment: [ 
        {
        nombre: user.userNick,
        content: String
        }
    ]
})

module.exports = mongoose.model('Article', articleSchema);