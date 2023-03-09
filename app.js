var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http')
const User = require("./models/userSchema.js");
const cors = require('cors');


const session = require('express-session');
const passport = require('passport');
require("dotenv").config(); //configuration dotenv
const mongoose = require('mongoose') //configuration mongoose

var app = express();

app.use(session({
  secret: "little_secret",
  resave: false,
  saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});




//Configuration base de donne mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL_MONGO , {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(
  ()=>{console.log('connect to BD');}
).catch(
  (error)=>{console.log(error.message);}
);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');





const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

const server=http.createServer(app);
server.listen(5000,()=>{console.log("app is runnig on port 5000")});