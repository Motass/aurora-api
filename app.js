var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

var path = require('path');
var dotEnvPath = path.resolve('../.env.test');

var indexRouter = require('./routes/api');
var cityRouter = require('./routes/city');
var userRouter = require('./routes/user');

require('./config/passport')(passport);

mongoose.connect('mongodb://thomas:qwerty1234@ds141208.mlab.com:41208/aurora-assignment');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);
app.use('/city', cityRouter);
app.use('/user', userRouter);

// error handler
app.use(function(err, req, res) {
    let response = {};
    let status = err.statusCode || 500;
    if(status >= 500){
        response.message = "Internal Server Error";
    } else {
        response.code = err.code;
        response.message = err.message;
    }
    return res.status(status).json(response);
});

module.exports = app;
