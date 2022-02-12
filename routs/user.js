'use strict'

var express = require('express');
var userController = require('../controllers/user');

var router = express.Router();

//Aquí se tratará posteriormente la imagen.
var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './upload/articles'});

//rutas de prueba
router.get('/animal', userController.datos);
router.post('/direc', userController.direc);

//rutas utiles
router.post('/save', userController.save);
router.get('/users', userController.getUsers);
//Optenemos los datos para loggear el objeto por url
router.get('/validar-user/:email/:password', userController.userValidado);
router.put('/actualizar/:id', userController.update);
router.delete('/delete/:id', userController.delete);

module.exports = router;