/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const db = require('../models');


router.route('/')
      // Post a new image to the gallery with relevant info and associate the user with the image.
      // After success, redirect to gallery.
      .post((req, res) => {
        console.log(req.user.dataValues);
        db.Picture.create({
          author: req.body.author,
          link: req.body.link,
          description: req.body.description,
          UserId: parseInt(req.user.dataValues.id)
        }).then(function(){
          res.redirect('/');
        });
      })
      // Retrieves the index page
      // If the user is authenticated, show the edit and delete buttons for pictures.
      .get((req, res) => {
        db.Picture.findAll()
        .then((data) => {



          if(req.isAuthenticated()=== true){

            let isOwnerArr = data.map((v) => {
              return req.user.dataValues.id === v.dataValues.UserId;
            });

            console.log(isOwnerArr);

            res.render('index', {
              picture: data,
              loggedin: true
            });
          } else {
              res.render('index', {
              picture: data
            });
          }
        });
      });

router.route('/new')
      // Retrieves the index page
      .get((req, res) => {
        res.render('new', null);
      });

router.route('/:id')
        // Retrieves the page for a specific picture.
        .get((req, res) => {
          db.Picture.findOne({
            where: {
              id: req.params.id
            }
          })
          // If a user is authenticated, add edit and delete buttons on the picture page.
          .then((data) => {
            if(req.isAuthenticated()=== true){
              data.dataValues.loggedIn = true;
              data.dataValues.isOwner = (req.user.dataValues.id === data.dataValues.UserId);
                res.render('picture', data.dataValues);
            } else {
            res.render('picture', data.dataValues);
            }
          });
        })
        // Update an image
        .put((req, res) => {
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
        // Delete an image
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
        // Render picture editing page.
        .get( (req, res) => {
          db.Picture.findOne({
            where: {
              id: req.params.id
            }
          })
          .then((data) => {
            if(req.isAuthenticated()=== true){
              res.render('edit', {
                id: req.params.id,
                author: data.dataValues.author,
                link: data.dataValues.link,
                description: data.dataValues.description
              });
            } else {
                res.redirect('/');
              }
          });
        });

module.exports = router;