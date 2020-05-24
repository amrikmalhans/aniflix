const express = require('express');
const routes = require('express').Router();
const axios = require('axios');

routes.get('/', function(req, res) {
   
    const getTrendingAnime = async () => {
        try {
            const trendingAnime = await axios.get(`https://kitsu.io/api/edge/trending/anime`);
            let data = trendingAnime.data.data;
            res.render('index.ejs', {
                data,
            })
            
        } catch (err) {
            console.log(err);
        }
    }
    getTrendingAnime();
      
  });


module.exports = routes;