'use strict'

var Article = require('../models/article');
var validator = require('validator');

var controllers = {

    prueba: (req, res) => {
        return res.status(200).send({
            status: 'Success',
            message: 'Soy la prueba del articulo'
        })
    },

    

    save: (req,res) => {
        
        var params = req.body;
        console.log(params);
        try{
            
            var validate_category = !validator.isEmpty(params.articleCategory)
            var validate_name = !validator.isEmpty(params.articleName);
            var validate_descripcion = !validator.isEmpty(params.articleDescripcion);
            var validate_stock = !validator.isEmpty(params.stock);
            var validate_precio = !validator.isEmpty(params.precio);
        }catch(err){
          
            return res.status(200).send({
                status: 'Error',
                message: 'Error de validacion'
            })
        }

        if(validate_category && validate_name && validate_descripcion && validate_stock && validate_precio){

            var article = new Article();
            
            article.articleCategory = params.articleCategory;
            article.articleName = params.articleName;
            article.articleDescripcion = params.articleDescripcion;
            article.articleImg = null
            article.stock = params.stock;
            article.precio = params.precio;
            article.comment = null;

            article.save((err, articleStored) => {
                
                if(err || !articleStored){
                    return res.status(404).send({
                        status:'Error',
                        message: 'Ha habido un error al guardar el articulo'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'Success',
                    article: articleStored
                });
                
            });
        
        }

        /*
    articleCategory: String,
    articleName: String,
    articleDescripcion: String,
    articleImg: String,
    stock: Number,
    precio: Number,
    comment: [ 
        {
        id: String,
        nombeUser: String,
        content: String
        }
    ]*/
    },

}

module.exports = controllers;