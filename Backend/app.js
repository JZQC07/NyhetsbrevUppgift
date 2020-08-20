var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newusersRouter = require('./routes/newusers');
var adminRouter = require('./routes/admin');

var app = express();

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/newusers', newusersRouter);

module.exports = app;