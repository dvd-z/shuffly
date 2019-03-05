import React, { Component } from 'react';
import getHashParams from '../functions/getHashParams';
import Playlist from './Playlist';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Playlists extends Component {
  constructor() {
    super();
    const params = getHashParams();
    this.state = {
      index: 0,
      playlists: []
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  componentDidMount() {
    if (!spotifyWebApi.getAccessToken()) {
      alert('No Spotify access token. Please log in again.');
      return;
    }

    spotifyWebApi.getUserPlaylists({ index: this.state.index })
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
    const playlists = this.state.playlists.map(playlist =>
      <Playlist key={playlist.uri} playlist={playlist} />
    );
    return (
      <ul>
        {playlists}
      </ul>
    );
  }
}

export default Playlists;