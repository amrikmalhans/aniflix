const express = require('express');
const routes = require('express').Router();
const { ensureAuthenticated } = require('../config/auth')
// Dashboard Page
routes.get('/dashboard', ensureAuthenticated, (req, res) => {
   res.render('dashboard', {
       name: req.user.name,
       savedAnime: req.user.animeId
   })
  });


module.exports = routes;