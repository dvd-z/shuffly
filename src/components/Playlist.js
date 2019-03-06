import React, { Component } from 'react';
import shuffleArray from '../functions/shuffleArray';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
  }

  shufflePlaylist() {
    if (!spotifyWebApi.getAccessToken()) {
      console.error('No Spotify access token. Please log in again.');
      return;
    }

    const options = {
      fields: 'items(track),limit,next,offset,previous,total'
    };
    spotifyWebApi.getPlaylistTracks(this.props.playlist.id, options)
      .then(res => {
        this.setState({ tracks: res.items });
        console.log('res');
        console.log(res);
        const shuffledPlaylist = shuffleArray(this.state.tracks);
        console.log(shuffledPlaylist);
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
        {this.props.playlist.name}
        <button onClick={() => this.shufflePlaylist()}>Shuffle</button>
      </div>
    );
  }
}

export default Playlist;