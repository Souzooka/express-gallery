const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../models');
const passport = require('passport');

router.route('/create')
      // Retrieves the index page
      .get((req, res) => {
        res.render('newUser', null);
      })

      .post((req, res) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            User.create({
              username: req.body.username,
              password: hash
            })
            .then( (user) => {
              console.log(user);
              res.redirect('login');
            })
            .catch((user) => {
              console.log(user);
              res.render('login',{error: 'Username already exist.'});
            });
          });
        });
      });

router.route('/login')
      // Retrieves the index page
      .get((req, res) => {
        console.log("req.query",req.query);

        if(req.query.error === "true"){
          res.render('login',{error: 'Invalid username/password.'});
        } else {
          res.render('login', null);
        }
      })

      .post(passport.authenticate('local', {
        successRedirect: '/gallery',
        failureRedirect: 'login?error=true'
      }));

router.route('/logout')
      .get((req, res) =>{
        req.logout();
        res.redirect('/gallery');
      });


module.exports = router;