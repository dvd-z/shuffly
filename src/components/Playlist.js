import React, { Component } from 'react';
import shuffleArray from '../functions/shuffleArray';
import Tracks from './Tracks';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadable: false,
      tracks: []
    };
  }

  shufflePlaylist() {
    if (!spotifyWebApi.getAccessToken()) {
      alert('No Spotify access token. Please log in again.');
      return;
    }

    const options = {
      fields: 'items(track(album(artists(name),images(url)),external_urls,id,name)),limit,total',
      limit: 3
    };
    spotifyWebApi.getPlaylistTracks(this.props.playlist.id, options)
      .then(res => {
        this.setState({
          loadable: res.total > res.limit,
          tracks: res.items
        });
        // const shuffledPlaylist = shuffledPlaylist(this.state.tracks);
      })
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }

  render() {
    return (
      <div>
        <img alt={this.props.playlist.name + " album art"} src={this.props.playlist.images[0].url} height="64"></img>
        {this.props.playlist.name} - {this.props.playlist.tracks.total} songs -
        <a href={this.props.playlist.external_urls.spotify}>Hyperlink</a>
        <button onClick={() => this.shufflePlaylist()}>Shuffle</button>
        <Tracks loadable={this.state.loadable} tracks={this.state.tracks} />
      </div>
    );
  }
}

export default Playlist;