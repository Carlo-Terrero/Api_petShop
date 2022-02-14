'use strict'

var express = require('express');
var controllerArticle = require('../controllers/article');
var router = express.Router();

// Rutas de prueba
router.get('/prueba', controllerArticle.prueba);

// Ruta para agregar articulo
router.post('/save', controllerArticle.save);

// Rutas para Optener articulos
router.get('/get-articulos', controllerArticle.getArticulos);
router.get('/get-categoria/:category', controllerArticle.getCategoria);

// Ruta para actualizar articulo
router.put('/actualizar/:id', controllerArticle.update)

// Ruta para eliminar articulo
router.delete('/delete/:id', controllerArticle.delete);
module.exports = router;