'use strict'

var validator = require('validator');
var Admin = require('../models/admin');

var controller = {

    save: (req, res) => {

        var params = req.body;

        try{
            var validator_name = !validator.isEmpty(params.nombre);
            var validator_email = !validator.isEmpty(params.email);
            var validator_password = !validator.isEmpty(params.password);
            
        }catch(err){
            return res.status(500).send({
                status: 'Error',
                message: 'Error de validacion, comprueba que los campos no esta vacíos'                
            })
        }

        /* adminName: String,
        adminEmail: String,
        adminPassword: String */
        if(validator_name, validator_email, validator_password){
            
            var admin = new Admin();

            admin.adminName = params.nombre;
            admin.adminEmail = params.email;
            admin.adminPassword = params.password;

            admin.save((err, adminStored) => {
                
                if(err || !adminStored){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'Ha ocurrido un error y no se ha guardado correctamente'
                    })
                }

                return res.status(200).send({
                    status: 'Success',
                    adminStored
                })
            })
        
        }else{
            return res.status(500).send({
                status: 'Error',
                message: 'Los campos no pueden esta vacios'                
            })
        }       

    },

    optenerAdmins: (req, res) => {
       
        Admin.find().exec((err, admin) =>{

            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'error al obtener los datos'
                })
            }

            return res.status(200).send({
                status: 'Success',
                admin
            })
        })                
    },

    //Este metodo hace la validacion del loggind
    varlidarAdmin: (req, res) => {

        var email = req.params.email;
        var pass = req.params.password;
        
        if(!email || !pass || email == null || pass == null){
            return res.status(500).send({
                status: 'Error',
                message: 'Email o contraseña incorrectos'
            })
        }

        Admin.find({adminEmail: email, adminPassword: pass}).exec((err, admin) => {
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Admin no existe '
                })
            }
             
            return res.status(200).send({
                status: 'Success',
                admin                
            })

        })

        /* return res.status(200).send({
            status: 'Success',
            message: 'soy el validador'
        }) */
    },

    actualizarAdmin: (req, res) => {

        var adminId = req.params.id;

        var params = req.body;

        try{
            var validator_name = !validator.isEmpty(params.adminName);
            var validator_email = !validator.isEmpty(params.adminEmail);
            var validator_password = !validator.isEmpty(params.adminPassword);
        }catch(err){
            return res.status(404).send({
                status: 'Error',
                message: 'Error de validacion o faltan datos'
            })
        }

        if(validator_name && validator_email && validator_password){
            
            Admin.findOneAndUpdate({_id: adminId}, params, {new:true}, (err, adminUpdated) => {
                console.log(adminUpdated)
                console.log(params)
                if(err){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al actualizar'
                    })
                }

                if(!adminUpdated){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No existe el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'Success',
                    adminUpdated
                });
            });
        }else{
            return res.status(500).send({
                status: 'Error',
                message: 'La validacion no es correcta'
            })
        }
    }
}

module.exports = controller;