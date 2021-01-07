const express = require('express');
const Bookdata = require('../model/bookdata');
const booksRouter = express.Router();

function router(homeNav){
  
    booksRouter.get('/', function(req,res) {
        Bookdata.find()
            .then(function(books) {
                const booksData = books.map(book => ({
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    image: `data:${book.image.mimetype};base64,${Buffer.from(book.image.data, 'binary').toString('base64')}`
                }));
                res.status(200).json(booksData)
            })        
    });
        
    booksRouter.get('/:id', function(req,res){
        const id = req.params.id;
        Bookdata.findOne({_id: id})
        .then(function(book) {
            const bookData = {
                _id: book._id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                image: `data:${book.image.mimetype};base64,${Buffer.from(book.image.data, 'binary').toString('base64')}`
            };
            res.status(200).json(bookData)
        })        
    });
        
    booksRouter.post('/',function(req,res){
        const item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.files.image
        };
        if (req.body._id) {
            const id = req.body._id;
            Bookdata.findOneAndUpdate({_id: id}, item, function() {
                res.redirect('/books');   
            });
        } else {
            const book = Bookdata(item);
            book.save();
            res.redirect('/books');   
        }
    }); 

    booksRouter.delete('/:id', function(req,res){
        const id = req.params.id;
        Bookdata.findByIdAndDelete(id, function(err, doc) {
            if (!err) {
                res.status(200).json(doc)
            }
        });
    });
    
    return booksRouter;
}
module.exports = router;