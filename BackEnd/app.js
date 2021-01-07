const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = new express();
const port = process.env.PORT || 5000;
  
const signinRouter = require('./src/routes/signinRoutes')();
const signupRouter = require('./src/routes/signupRoutes')();
const booksRouter = require('./src/routes/bookRoutes')();
const authorsRouter = require('./src/routes/authorRoutes')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors());
app.use(fileUpload());
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

app.listen(port,()=>{console.log("Server Ready at" + port)} );

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});