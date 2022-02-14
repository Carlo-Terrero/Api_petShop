'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargamos fucheros de rutas(las rutas individuales de cada objeto)
var user_routes = require('./routs/user');
var admin_routes = require('./routs/admin');
var article_routes = require('./routs/article');

// Middlewares -> se ejecuta antes de cargar una ruta o una url de la app
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

// Configuramos los CORS para usarse en cualquier frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Utilizamos los ficheros de las rutas (cargamos las rutas).
app.use('/user', user_routes);
app.use('/admin', admin_routes);
app.use('/article', article_routes);


module.exports = app;