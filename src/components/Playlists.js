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
    this.fetchNewArt = this.fetchNewArt.bind(this);
  }

  componentDidMount() {
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

  fetchNewArt(id) {
    const options = {
      fields: 'images'
    };
    spotifyWebApi.getPlaylist(id, options)
      .then(res => {
        let swappedPlaylists = this.state.playlists;
        swappedPlaylists[this.state.playlists.findIndex(
          playlist => playlist.id === id
        )].images = res.images;
        this.setState({
          playlists: swappedPlaylists
        });
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
        fetchNewArt={this.fetchNewArt}
        id={playlist.id}
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