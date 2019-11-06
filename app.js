const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const index = require('./routes/api');

require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

var app = express();
app.enable('trust proxy');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', index);

// error handler
app.use(function(err, req, res, next) {
    let response = {};
    let status = err.status || 500;
    if(status >= 500){
        response.message = "Internal Server Error";
    } else {
        response.code = err.code;
        response.message = err.message;
    }
    return res.status(status).json(response);
});

module.exports = app;
