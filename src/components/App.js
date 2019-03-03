import React, { Component } from 'react';
import './App.css';
import generateRandomString from '../functions/generateRandomString';
import getHashParams from '../functions/getHashParams';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = getHashParams();
    this.state = {
      playlists: []
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  login() {
    const clientId = '7306ac07764749518aca94d65ccfe50d';
    const redirectUri = `http://localhost:3000`;
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

  getPlaylists() {
    if (!spotifyWebApi.getAccessToken()) {
      alert('No Spotify access token. Please log in.');
      return;
    }

    spotifyWebApi.getUserPlaylists()
      .then(res => {
        this.setState({ playlists: res.items });
        console.log(res.items);
      })
      .catch(err => {
        const response = JSON.parse(err.response);
        alert(response.error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shuffly</h1>
        </header>
        <button onClick={() => this.login()}>Log in</button>
        <button onClick={() => this.getPlaylists()}>Get playlists</button>
      </div>
    );
  }
}

export default App;