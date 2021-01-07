const express = require('express');
const Authordata = require('../model/authorData');
const authorsRouter = express.Router();

function router(homeNav){
    
    authorsRouter.get ('/', function(req,res){
        Authordata.find()
            .then(function(authors){
                const authorsData = authors.map(author => ({
                    _id: author._id,
                    name: author.name,
                    genre: author.genre,
                    image: `data:${author.image.mimetype};base64,${Buffer.from(author.image.data, 'binary').toString('base64')}`
                }))
                res.status(200).json(authorsData)
            })       
    });

    authorsRouter.get('/:id', function(req,res){
        const id = req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            console.log("Author : ", author);
            const authorData = {
                _id: author._id,
                name: author.name,
                genre: author.genre,
                image: `data${author.image.mimetype};base64,${Buffer.from(author.image.data, 'binary').toString('base64')}`
            }
            res.status(200).json(authorData)
        })  
    });

        
    authorsRouter.post('/',function(req,res){
        console.log(req.body);
        console.log(req.files);
        var item = {
            name: req.body.name,
            genre: req.body.genre,
            image: req.files.image
        };
        if (req.body._id) {
            const id = req.body._id;
            Authordata.findOneAndUpdate({_id: id}, item, function() {
                res.redirect('/authors');   
            });
        } else {
            const author = Authordata(item);
            author.save();
            res.redirect('/authors');
        }
    });

    authorsRouter.delete('/:id', function(req,res){
        const id = req.params.id;
        Authordata.findByIdAndDelete(id, function(err, doc) {
            if (!err) {
                res.status(200).json(doc)
            }
        });
    });

    
    return authorsRouter;
}
module.exports = router;
