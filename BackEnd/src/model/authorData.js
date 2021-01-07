const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@ictakfiles.xnejz.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority')
.then(() => {
    console.log('Database sucessfully connected')
},
error => {
    console.log('Database could not connected: ' + error)
});

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: String,
    genre: String,
    image: {
        data: Buffer,
        mimetype: String,
        name: String
    }
});

var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;