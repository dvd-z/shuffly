import React, { Component } from 'react';
import './App.css';
import Login from './Login';
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
        <Login />
        <button onClick={() => this.getPlaylists()}>Get playlists</button>
      </div>
    );
  }
}

export default App;