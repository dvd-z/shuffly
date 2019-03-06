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
      console.error('No Spotify access token. Please log in again.');
      return;
    }

    spotifyWebApi.getUserPlaylists({ index: this.state.index })
      .then(res => {
        const validPlaylists = res.items.filter(playlist =>
          playlist.owner.id === this.props.userId
        );
        this.setState({ playlists: validPlaylists });
      })
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }

  render() {
    const playlists = this.state.playlists.map(playlist =>
      <Playlist key={playlist.uri} accessToken={this.props.params ? this.props.params.access_token : ''} playlist={playlist} />
    );
    return (
      <ul>
        {playlists}
      </ul>
    );
  }
}

export default Playlists;