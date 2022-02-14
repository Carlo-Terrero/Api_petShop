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

    
    // Metodo guardar/agregar articulos
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
    },

    //Extraer todos los articulos
    getArticulos: (req, res) => {

        Article.find().sort('-_id').exec((err, Articles) =>{

            if(err || !Articles){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Ha ocurrido un erro o no existe articulos'
                })
            }

            return res.status(200).send({
                status: 'Success',
                Articles
            })
        })
    },

    // Optener 1 artículo
    getCategoria: (req, res) => {
        
        var category = req.params.category;
        //console.log(category);

        if(!category || category == null){
            return res.status(404).send({
                status: 'Error',
                message: 'No tenemos articulos para este animal'                
            });
        }

        Article.find({articleCategory: category}, (err, article) => {
            
            if(err || article == null || !article || article == [ ]){
                return res.status(404).send({
                    status: 'Error',
                    message: 'Articulo no existente',                    
                });
            }          

            return res.status(200).send({
                status: 'Success',                
                article
            });
        })

        
    },

    update: (req, res) => {
        
        var articleId = req.params.id;
        var params = req.body;

        try{
            var validate_category = !validator.isEmpty(params.articleCategory)
            var validate_name = !validator.isEmpty(params.articleName);
            var validate_descripcion = !validator.isEmpty(params.articleDescripcion);
            var validate_stock = !validator.isEmpty(params.stock);
            var validate_precio = !validator.isEmpty(params.precio);

        }catch(err){
            return res.status(500).send({
                status: 'Error',
                message: 'Validacion de los datos incorrecta'            
            })
        }

        if(validate_category && validate_name && validate_descripcion && validate_stock && validate_precio){

            Article.findByIdAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdate) => {

                if(err){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al actualizar'            
                    });
                }

                if(!articleId){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'El articulo no existe'            
                    });
                }

                return res.status(200).send({
                    status: 'Success',
                    message: 'Articulo actualizado con exito',
                    articleUpdate
                });

            })

        }else{
            return res.status(500).send({
                status: 'Error',
                message: 'Validacion incorrecta, no puede quedar ningun campo vacio'            
            });
        }       
    },

    delete: (req, res) => {

        var articleId = req.params.id;

        Article.findByIdAndDelete({_id: articleId}, (err, aricleremoved) => {

            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Se ha producido un erro al eliminar el articulo'            
                }) 
            }

            
            if(!aricleremoved){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha aliminado el articulo, posiblemente no exista'            
                }) 
            }
        
            return res.status(200).send({
                status: 'Success',
                message: 'Articulo eliminado correctamente',
                aricleremoved         
            })
        })       
    }
}

module.exports = controllers;