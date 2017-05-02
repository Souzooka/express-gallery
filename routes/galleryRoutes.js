/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const db = require('../models');

router.route('/')
      .post((req, res) => {
        res.render('new', null);
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