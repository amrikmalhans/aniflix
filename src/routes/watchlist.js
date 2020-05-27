const express = require('express');
const routes = require('express').Router();

routes.post('/list', (req, res) => {
   
  const data = req.body;
  const animeId = data.title;
  const animeSrc = data.src;
  const id = req.user._id;
  User.findOneAndUpdate({_id: objectId(id)}, {$push: {animeId: {
    title: animeId,
    src: animeSrc
  }}}, {upsert: true}, (err, result) => {
    console.log(result);
    res.redirect('/')
  })
});

routes.delete('/list', (req, res) => {
  const data = req.body;
  const animeId = data.title;
  const animeSrc = data.src;
  const id = req.user._id;
  User.findOneAndUpdate({_id: objectId(id)}, {$pull: {animeId: {
    title: animeId,
    src: animeSrc
  }}}, {upsert: true}, (err, result) => {
    console.log(result);
    
  })
});

module.exports = routes;