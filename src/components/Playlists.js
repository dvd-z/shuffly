import React, { Component } from 'react';
import Playlist from './Playlist';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Playlists extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      playlists: []
    };
  }

  componentDidMount() {
    if (this.props.params.access_token) {
      spotifyWebApi.setAccessToken(this.props.params.access_token);
    }

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