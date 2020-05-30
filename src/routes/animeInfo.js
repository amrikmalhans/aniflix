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

            let mao1;
            const titles = [];
            if (req.user !== undefined) {
               
                req.user.animeId.forEach(element => {
                    titles.push(element.title)            
                    })
                     
                
                    if(titles.indexOf(animeData[0].attributes.canonicalTitle) > -1 == false){
                        mao1 = ' to list'
                        
                    } else {
                        mao1 = 'ed'
                        
                    } 
                    
                    console.log(mao1);
            }
           
            if (req.user === undefined) {
                mao1 = 'add to list'
            }
            

            if (animeData.attributes === []) {
                res.render('404');
            } else {
                res.render('animeInfo', {
                    animeData,
                    reviewsData,
                    epsData,
                    streamLinks,
                    myVar : mao1
                })    
            }
            
            
            
        } catch (err) {
            console.log(err);
        }
    }
    getAnime();
      
  });


module.exports = routes;