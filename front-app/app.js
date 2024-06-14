var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

// CONFIGURAÇÃO DE SESSÃO
app.use(session({
  secret: '8c10472423dc7ac1b8fdb91c96793ae8d385da1af1a334950f9f22dbef19edad',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// IMPORTANDO ROTAS DE /ROUTES...
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pacotesRouter = require('./routes/pacotes');
var authRouter = require('./routes/auth');

// DEFININDO ENDPOINTS PARA ROTAS IMPORTADAS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pacotes', pacotesRouter);
app.use('/login', authRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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
  res.render('error');
});

module.exports = app;