var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var cors = require('cors');

var logger = require('morgan');
let session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let authRouter =  require('./routes/auth'); 

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(session({secret:"randoms_string", cookie: { maxAge: 300000 }}));
var sessionChecker = (req, res, next) => {
    if (req.session.user) {
        console.log("Session Checker: User is logged in");
    } else {
    }    
    next();
};
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    allowedHeaders:"Content-Type,Accept"
  }));
app.use(sessionChecker);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use((err, req, res, next) => {
    // log the error...
    if(err){
        console.log(err);
        res.sendStatus(err.httpStatusCode).json(err);
    }
  })

module.exports = app;
