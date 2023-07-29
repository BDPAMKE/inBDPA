var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userdataRouter = require('./routes/userdata');
var getinfoRouter = require('./routes/getinfo');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var resttestRouter = require('./routes/resttest');
var adminRouter = require('./routes/admin');
var connectcountRouter = require('./routes/connectcount');
var profileedit = require('./routes/profileedit');
var opportunitiesRouter = require('./routes/opportunities');
var opportunityPageRouter = require('./routes/opportunityPage');
var myOpportunitiesRouter = require('./routes/myOpportunities');
var profileRouter = require('./routes/profile');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userdata', userdataRouter);
app.use('/getinfo', getinfoRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/resttest', resttestRouter);
app.use('/admin', adminRouter);
app.use('/connectcount',connectcountRouter);
app.use('/profileedit',profileedit);
app.use('/opportunities', opportunitiesRouter);
app.use('/opportunityPage', opportunityPageRouter);
app.use('/myOpportunities', myOpportunitiesRouter)
app.use('/profile', profileRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('error', {title:'404 page not found'});
});


module.exports = app;