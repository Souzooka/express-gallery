/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const db = require('../models');

router.route('/')
      .post((req, res) => {
        let pictureInfo = req.body;
        db.Picture.create({
          author: req.body.author,
          link: req.body.link,
          title: req.body.title
        }).then(function(){
          res.redirect('/');
        });

      })
      // Retrieves the index page
      .get((req, res) => {
        console.log(db.Picture.findAll());
        res.render('index', null);
      });

router.route('/new')
      // Retrieves the index page
      .get((req, res) => {
        res.render('new', null);
      });



module.exports = router;