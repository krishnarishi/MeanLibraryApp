const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@ictakfiles.xnejz.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database sucessfully connected')
    },
    error => {
        console.log('Database could not connected: ' + error)
    });

const Schema = mongoose.Schema; 

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    image: {
        data: Buffer,
        mimetype: String,
        name: String
    }
});

var Bookdata = mongoose.model('bookdata', BookSchema);  

module.exports = Bookdata;