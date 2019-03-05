import React, { Component } from 'react';
import generateRandomString from '../functions/generateRandomString';

class Login extends Component {
  login() {
    const clientId = '7306ac07764749518aca94d65ccfe50d';
    const redirectUri = `http://localhost:3000/app`;
    const scope = 'user-read-private'
      + ' user-read-email'
      + ' playlist-read-private'
      + ' playlist-modify-private';
    const state = generateRandomString(16);
    const url = 'https://accounts.spotify.com/authorize'
      + '?response_type=token'
      + '&client_id=' + encodeURIComponent(clientId)
      + '&scope=' + encodeURIComponent(scope)
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