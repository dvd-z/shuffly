import React, { Component } from 'react';
import generateRandomString from '../functions/generateRandomString';

class Login extends Component {
  login() {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const scope =
      ['playlist-read-private',
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
      <button onClick={() => this.login()}>Log in</button>
    );
  }
}

export default Login;