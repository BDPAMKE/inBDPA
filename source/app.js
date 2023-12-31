var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const fileUpload = require('express-fileupload')

var articlesRouter = require('./routes/articles');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var systemDataRouter = require('./routes/systemData');
var getinfoRouter = require('./routes/getinfo');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register')
var resttestRouter = require('./routes/resttest');
var adminRouter = require('./routes/admin');
var connectcountRouter = require('./routes/connectcount');
var opportunitiesRouter = require('./routes/opportunities');
var myArticlesRouter = require('./routes/myArticles');
var myOpportunitiesRouter = require('./routes/myOpportunities');
var profileRouter = require('./routes/profile');
var profileEditRouter = require('./routes/profileedit');
var forgotPassRouter = require('./routes/forgotPass');
var impersonateRouter = require('./routes/impersonate');
var profilepicRouter = require('./routes/profilepic');
var errorRouter = require('./routes/error');


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
app.use('/myArticles', myArticlesRouter);
app.use('/articles', articlesRouter);
app.use('/users', usersRouter);
app.use('/systemData', systemDataRouter);
app.use('/getinfo', getinfoRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/resttest', resttestRouter);
app.use('/admin', adminRouter);
app.use('/connectcount',connectcountRouter);
app.use('/opportunities', opportunitiesRouter);
app.use('/myOpportunities', myOpportunitiesRouter)
app.use('/profile', profileRouter);
app.use('/profileEdit', profileEditRouter);
app.use('/forgotPass', forgotPassRouter);
app.use('/impersonate', impersonateRouter);
app.use('/profilepic', profilepicRouter);
app.use('/error', errorRouter);

app.use(fileUpload())
app.use(express.static('public'))

// catch 404 and forward to error handler

const auth = require("./middleware/verifytoken");

app.use(auth, function(req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
  res.status(404).render('error', {title:'404 page not found',role:role,id:id,name:name});
});


module.exports = app;