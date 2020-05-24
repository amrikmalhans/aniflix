const express = require('express');
const routes = require('express').Router();
const axios = require('axios');

routes.get('/', function(req, res) {
   
    const getAnime = async () => {
        try {
            
            const animeID = req.cookies.animeId;
            const animeInfo = await axios.get(`https://kitsu.io/api/edge/anime?filter[id]=${animeID}`);
            const animeReviews = await axios.get(`https://kitsu.io/api/edge/anime/${animeID}/reviews`);
            const animeEps = await axios.get(`https://kitsu.io/api/edge/anime/${animeID}/episodes`);
            const animeStream = await axios.get(`https://kitsu.io/api/edge/anime/${animeID}/streaming-links`);
            
            const reviewsData = animeReviews.data.data.splice(1, 3);
            const animeData = animeInfo.data.data;
            const epsData = animeEps.data.data;
            const streamLinks = animeStream.data.data;
            
            
            
            res.render('animeInfo', {
                animeData,
                reviewsData,
                epsData,
                streamLinks,
            })
            
        } catch (err) {
            console.log(err);
        }
    }
    getAnime();
      
  });


module.exports = routes;