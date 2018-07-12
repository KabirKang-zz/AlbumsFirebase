var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var Firebase = require('firebase');
var config = {
  apiKey: "AIzaSyCe0Bls5D_hhBgmjiQmnYUbeqBUHQWFTZk",
  authDomain: "albumz-f3910.firebaseapp.com",
  databaseURL: "https://albumz-f3910.firebaseio.com",
  projectId: "albumz-f3910",
  storageBucket: "albumz-f3910.appspot.com",
  messagingSenderId: "691757684482"
};
var fbRef = Firebase.initializeApp(config);

// Route files
var routes = require('./routes/index');
var albums = require('./routes/albums');
var genres = require('./routes/genres');
var users = require('./routes/users');

// Init app
var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Logger
app.use(logger('dev'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Handle Sessions
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', routes);
app.use('/albums', albums);
app.use('/genres', genres);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

// Run server
app.listen(app.get('port'), function() {
  console.log('Server started on port: ' + app.get('port'));
});
