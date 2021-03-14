require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Spotify API information

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// Our routes go here:

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/artist-search", (req, res) => {

  spotifyApi
  .searchArtists(req.query.artistName)
  .then(data => {
    console.log('The received data from the API: ', data.body);
    console.log(data.body.artists)
    
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));

  // console.log(req.query)  // huge hurldle: when you pass data from the form it comes over as an object from req.query
  // console.log(req.query.artistName)
  
  res.render("index");


});


app.get('/beers', (req, res) => {
  // ^ the /beers here refers to the url in the browser address bar
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', {beerList: beersFromApi});
      // the 'beers' ^ here refers to the name of the hbs file you wanna show when the user visits that url
    })
    .catch(error => console.log(error));
});



app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
