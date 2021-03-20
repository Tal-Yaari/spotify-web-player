var express = require('express'); // Express web server frmework

var client_id = 'cf6854fe87b6471e8c5dc3ac3e0dfd56'; // Your client id
var client_secret = 'b20c7daf47984966bc52cd609371f55b'; // Your secret
var redirect_uri = 'http://localhost:4200'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var app = express();

const Spotify = require("spotify-web-api-node");
const spotifyApi = new Spotify({
  clientId: client_id,
  clientSecret: client_secret,
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);


console.log('Listening on 8888');
app.listen(8888);