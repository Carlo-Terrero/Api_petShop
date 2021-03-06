'use strict'

var express = require('express');
var adminController = require('../controllers/admin');

var router = express.Router();

//Rutas utiles
router.post('/save', adminController.save);
router.get('/getAdmins', adminController.optenerAdmins);
//validamos administrador
router.get('/validar-admin/:email/:password', adminController.varlidarAdmin);
router.put('/actualizar/:id', adminController.actualizarAdmin);
router.delete('/delete/:id', adminController.deleteAdmin);

module.exports = router;