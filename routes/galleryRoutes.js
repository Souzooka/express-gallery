/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const db = require('../models');

router.route('/new')
      // Retrieves the index page
      .get((req, res) => {
        res.render('new', null);
      });

module.exports = router;