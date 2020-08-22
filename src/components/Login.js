import React, { Component } from 'react';
import generateRandomString from '../functions/generateRandomString';
import "./Login.css";
import logo from "../images/logo.png";

class Login extends Component {
  login() {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_REDIRECT_URI_DEV : process.env.REACT_APP_REDIRECT_URI_PROD;
    const scope =
      ['playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private'];
    const state = generateRandomString(16);
    const url = 'https://accounts.spotify.com/authorize'
      + '?response_type=token'
      + '&client_id=' + encodeURIComponent(clientId)
      + '&scope=' + encodeURIComponent(scope.join(' '))
      + '&redirect_uri=' + encodeURIComponent(redirectUri)
      + '&state=' + encodeURIComponent(state);
    window.location = url;
  }

  render() {
    return (
      <div id="background">
        <div id="text-container">
          <span id="welcome"><span role="img" aria-label="Hand wave">👋</span>&nbsp;&nbsp;Hey there, welcome to Shuffly</span>
          <span id="description">Shuffly is a service that directly accesses your Spotify playlists to randomly reorder the tracks on them in place</span>
          <div id="button-container">
            <button className="SpotifyButton" onClick={() => this.login()}>LOG IN WITH SPOTIFY</button>
            <span id="powered-by">Powered by Spotify API</span>
            <span id="github"><a href="https://github.com/dvd-z/shuffly">Check out the code on GitHub</a></span>
          </div>
        </div>
        <div id="img-container">
          <img alt="Shuffly logo" id="logo" src={logo}></img>
        </div>
      </div>
    );
  }
}

export default Login;