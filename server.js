/*jshint esversion:6*/
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const db = require('./models');
const { User } = require('./models');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bcrypt = require('bcrypt');
const PORT = process.env.port || 3000;
const saltRounds = 10;

const indexRoutes = require('./routes/indexRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

//Redis Server
app.use(session({
  store: new RedisStore(),
  secret: 'ezg89mX2UA8X7OTYcnas',
  resave: false,
  saveUninitialized: true
}));

// Init Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy (
  function(username, password, done) {
    console.log('runs before serializing');
    User.findOne({
      where: {
        username: username
      }
    }).then ( user => {
      if (user === null) {
        console.log('user failed');
        return done(null, false, {message: 'bad username'});
      }else {
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            return done(null, user);
          }else {
            return done(null, false, {message: 'bad password'});
          }
        });
      }
    }).catch(err => {
      console.log('error: ', err);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing');
                              // ^ ---------- given from authentication strategy
  // building the object to serialize to save
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
                                 // ^ ---------- given from serializeUser
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    return done(null, user); // <------- inserts into the request object
  });
});

function isAuthenticated (req, res, next) {
  console.log('checking');
  if(req.isAuthenticated()) {
    console.log('you good');
    next();
  }else {
    console.log('you bad!!!!');
    res.redirect('/login');
  }
}

// Create Handlebars Engine
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//To use bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//To use static files
app.use('/static', express.static('public'));

//To use methodOverride
app.use(methodOverride('_method'));


// Routes
app.use('/', indexRoutes);
app.use('/gallery', galleryRoutes);

// Initialize server
const server = app.listen(PORT, () => {
  db.sequelize.sync();
});

// For testing
module.exports = server;