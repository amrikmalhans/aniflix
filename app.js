const express = require('express');
const morgan = require('morgan');
const axios = require('axios')
const JSON = require('circular-json');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e659d9cd8ac1435ca211f78064ce9b1b');
const animeRouter = require('./src/routes/anime');
const animeInfoRouter = require('./src/routes/animeInfo');
const trendingAnimeRouter = require('./src/routes/trendingAnime');
const userRouter = require('./src/routes/users');
const dashboardRouter = require('./src/routes/dashboard');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const Anime = require('./src/models/AnimeList');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const objectId = require('mongodb').ObjectID; 
const User = require('./src/models/userSchema');
const { ensureAuthenticated } = require('./src/config/auth')

const PORT = process.env.PORT || 5000;

// Passport Config
require('./src/config/passport')(passport);

const app = express();
app.use(cookieParser())
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true })); 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// connect flash
app.use(flash());
// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next();
})
app.use(cors())

app.use(morgan('tiny'));
app.use(express.json());

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use('/', trendingAnimeRouter)
app.use('/myaction', animeRouter);
app.use('/anime_detail', animeInfoRouter);
app.use('/users', userRouter);
app.use('/', dashboardRouter);

// connect to db
 mongoose.connect('mongodb://localhost/animeAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.dir("Connection Successful!");
});


app.get('/list', ensureAuthenticated, (req, res) => {
  
})

app.post('/list', (req, res, next) => {
  
  const data = req.body;
  const animeId = data.title;
  const animeSrc = data.src;
  const id = req.user._id;
  User.findOneAndUpdate({_id: objectId(id)}, {$push: {animeId: {
    title: animeId,
    src: animeSrc
  }}}, {upsert: true}, (err, result) => {
    console.log(result);

  })
  next();
});


app.delete('/list', (req, res) => {
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

const notFound = (req, res, next) => {
    res.status(404);
    const error = new Error('not found');
    next(error);
}

const errorHandler = (error, req, res, next) => {
  res.status(res.statusCode || 500);
    res.json({
        message: error.message
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})