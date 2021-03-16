// things to not share when commited
require("dotenv").config(); 

// define required modules for app framework ** don't forget to install them
const express = require('express');
const app = express();
const hbs = require("hbs");
const path  = require("path"); 


// specific API information ** store any tokens in the .env file to protect them
// define API specific modules ** don't for get to install them
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));


// define frequently used paths
app.use(express.static(path.join(__dirname,'/public'))) // use middleware that points to all public files
app.set("views", path.join(__dirname , "/views")); // establish path for all views
app.set("view engine", "hbs"); // use handlebars to handle html
hbs.registerPartials(path.join(__dirname + "/views/partials")); // allows the establishment of partials


// define paths and HTTP methods
app.get("/", (req, res) => {
  console.log(req.query.artistName)
  res.render("index");
});


app.get("/artist-search", (req, res) => {
  console.log(req.query.artistName)

  spotifyApi
  .searchArtists(req.query.artistName)
  .then(data => {
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    // res.send('artist-search-results')
    console.log(data.body.artists.items[0].images,"<<<<<")
    res.render('artist-search-results',{artist:data.body});
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
});




// define where to listine for app
app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
