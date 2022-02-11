'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = Schema({
    adminName: String,
    adminEmail: String,
    adminPassword: String
})

//aqui va el nombre de la collections y la estructura
module.exports = mongoose.model('Admin', adminSchema);