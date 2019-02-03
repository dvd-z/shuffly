/**
 * This is an example of a basic node.js script that performs
 * the Implicit Grant oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
 */

var express = require('express'); // Express web server framework
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, '/auth')));
console.log('Listening on 8888');
app.listen(8888);
