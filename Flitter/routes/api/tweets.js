'use strict';

const express = require('express')
const router = express.Router();
const Tweets= require('../../models/Tweets')

router.get('/', async(req, res, next)=> {
    try {

    const tweets = await Tweets.find();
    res.json({results: tweets });
    } catch (err) {
        next(err);
    }
})

//CRUD
//Recurso: tweets
/**
 * Create
 * Read 
 * Update
 * Delete
 */

//GET/api/tweets/(id)
//devuelve un solo tweet

router.get('/:id', async(req, res , next)=> {

    try{ 
        const id = req.params.id;
    
        //buscar un tweet en la BD
        const tweet = await Tweets.findById(id);

        res.json({result: tweet})

    }catch (err) {
        next(err);
    }

})

//PUT/api/tweets/(id) (body=agenteData)
//Actualizar un tweet

router.put('/:id', async(req, res, next) =>{

    try {
        const id = req.params.id; 
        const tweetData= req.body;

        const TweetModificado = await Tweets.findOneAndUpdate({_id: id}, tweetData, {
            new: true //esto hace que nos devuelva el documento actualizado en el postman
        });

        res.json({result: TweetModificado});
        
    } catch (err) {
        next(err);
    }
})

//POST/api/tweets (body=agenteData)
//Crear tweet

router.post('/', async(req, res, next) =>{

    try {
        const tweetData = req.body;

        //instanciar un nuevo agente en memoria 
        const tweet = new Tweets(tweetData);

        //guardarlo en base de datos
        const tweetSaved = await tweet.save();

        //responder
       res.json({result: tweetSaved});
        
    } catch (err) {
        next(err); 
    }
});

//POST/api/tweets/:id (body=agenteData)
//Eliminar Tweet

router.delete('/:id', async(req, res, next) =>{

    try {
        const id = req.params.id; 

            const tweet = await Tweets.findById(id);
            if (!tweet) {
                const err = new Error('not found') //Se podria quitar
                err.status = 404;
                next(err);
                return ; //para que no se jecute el codigo siguiente
            }

         await Tweets.deleteOne({_id: id});
       

        res.json();
        
    } catch (err) {
        next(err); 
    }
});



//Exportando modulo

module.exports = router ; 