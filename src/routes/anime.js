const express = require('express');
const routes = require('express').Router();
const axios = require('axios');

  
routes.post('/', function(req, res) {
    const getAnime = async () => {
      try {
          let name = req.body.name;
          let anime =  await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${name}`);
          let data = anime.data.data;
          if (data === []) {
            res.render('404');
          } else {
            res.render('anime', {
                data,
            });
          }
         
          
      } catch (err) {
          console.log(err);
      }
  }
  getAnime();
    
  });
module.exports = routes;