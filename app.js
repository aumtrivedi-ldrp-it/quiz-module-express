var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var index_router = require('./routes/index');
var quiz_router = require('./routes/quiz.route');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect with database
mongoose.connect('mongodb://127.0.0.1:27017/quiz_test')
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/quiz_test`);
  })
  .catch(() => {
    console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/quiz_test`);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_router);
app.use('/startquiz', quiz_router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let port = 8080;

app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});
module.exports = app;
