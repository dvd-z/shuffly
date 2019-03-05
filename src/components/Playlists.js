import React, { Component } from 'react';
import getHashParams from '../functions/getHashParams';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Playlists extends Component {
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
      <button onClick={() => this.getPlaylists()}>Get playlists</button>
    );
  }
}

export default Playlists;