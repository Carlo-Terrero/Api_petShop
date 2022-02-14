'use strict'

var express = require('express');
var controllerArticle = require('../controllers/article');
var router = express.Router();

// Rutas de prueba
router.get('/prueba', controllerArticle.prueba);

router.post('/save', controllerArticle.save);
router.get('/get-articulos', controllerArticle.getArticulos);

module.exports = router;