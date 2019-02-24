const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8888;

var params = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
  function generateRandomString(length) {
    var text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  function login() {
    const clientId = '7306ac07764749518aca94d65ccfe50d';
    const redirectUri = `http://localhost:3000`;
    const state = generateRandomString(16);
    const scope = 'user-read-private'
      + ' user-read-email'
      + ' playlist-read-private'
      + ' playlist-modify-private';
    const url = 'https://accounts.spotify.com/authorize'
      + '?response_type=token'
      + '&client_id=' + encodeURIComponent(clientId)
      + '&scope=' + encodeURIComponent(scope)
      + '&redirect_uri=' + encodeURIComponent(redirectUri)
      + '&state=' + encodeURIComponent(state);
    return url;
  }
  const url = login();
  res.send({ url: url });
});

app.post('/params', (req, res) => {
  params = req.body;

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
