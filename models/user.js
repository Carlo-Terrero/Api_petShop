'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({    
        userName: String,
        userApellido: String,
        userEmail: String,
        userNick: String,
        userPassword: String,
        userDir: String 
})

module.exports = mongoose.model('User', userSchema);