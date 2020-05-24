const mongoose = require('mongoose');


const AnimeSchema = new mongoose.Schema({
    title: String,
    src: String
});

let Anime = mongoose.model('Anime', AnimeSchema);

module.exports = Anime;