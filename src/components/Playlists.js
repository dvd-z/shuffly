import React, { Component } from 'react';
import './Playlists.css';
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
    if (!spotifyWebApi.getAccessToken()) {
      alert('No Spotify access token. Please log in again.');
      return;
    }

    spotifyWebApi.getUserPlaylists({ index: this.state.index })
      .then(res => {
        const validPlaylists = res.items.filter(playlist =>
          playlist.owner.id === this.props.userId && playlist.name.includes('demo')
        );
        this.setState({ playlists: validPlaylists });
      })
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }

  render() {
    const filteredPlaylists = this.state.playlists.filter(playlist =>
      playlist.name.toLocaleLowerCase().includes(this.props.query.toLocaleLowerCase())
    ).map(playlist =>
      <Playlist
        key={playlist.id}
        accessToken={this.props.params ? this.props.params.access_token : ''}
        playlist={playlist}
      />
    );
    return (
      <div>
        <h3>Your Playlists</h3>
        <div className="scroller">
          {filteredPlaylists}
        </div>
      </div>
    );
  }
}

export default Playlists;