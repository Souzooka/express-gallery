/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const db = require('../models');

router.route('/')
      // Retrieves the index page
      .get((req, res) => {
        console.log(db.Picture.findAll());
        res.render('index', null);
      });

module.exports = router;