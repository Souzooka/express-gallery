/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const db = require('../models');

router.route('/')
      .post((req, res) => {
        db.Picture.create({
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        }).then(function(){
          res.redirect('/');
        });

      })
      // Retrieves the index page
      .get((req, res) => {
        db.Picture.findAll()
        .then((data) => {
            // console.log("data",data);
          res.render('index', {
            picture: data
          });
        });
      });

router.route('/new')
      // Retrieves the index page
      .get((req, res) => {
        res.render('new', null);
      });

router.route('/:id')
        .get((req, res) => {
          db.Picture.findOne({
            where: {
              id: req.params.id
            }
          })
          .then((data) => {
            console.log("data id", data.dataValues);
            res.render('picture', data.dataValues);
          });
        })
        .put((req, res) => {
          console.log('test')
          db.Picture.update({
            author: req.body.author,
            link: req.body.link,
            description: req.body.description
          }, {
            where: {
              id: req.params.id
            }
          })
          .then((data)=>{
            res.redirect(303,`/gallery/${req.params.id}`);
          });
        })
        .delete( (req, res) => {
          db.Picture.destroy({
            where: {
              id: req.params.id
            }
          })
          .then( (data) => {
            res.redirect(303, '/gallery');
          });
        });



router.route('/:id/edit')
        .get( (req, res) => {
          db.Picture.findOne({
            where: {
              id: req.params.id
            }
          })
          .then((data) => {
            res.render('edit', {
              id: req.params.id,
              author: data.dataValues.author,
              link: data.dataValues.link,
              description: data.dataValues.description
            });
          });
        });

module.exports = router;