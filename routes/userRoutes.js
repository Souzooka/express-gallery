const express = require('express');
const router = express.Router();
const db = require('../models');

router.route('/create')
      // Retrieves the index page
      .get((req, res) => {
        res.render('newUser', null);
      });

module.exports = router;