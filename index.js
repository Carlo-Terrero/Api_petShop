'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_rest_petshop',  { useNewUrlParser: true })
    .then(() => {
        console.log('conexion a BBDD exitosa')

        app.listen(port, () => {
            console.log('Servidor subido en http://localhost:' + port)
        });
    })
   