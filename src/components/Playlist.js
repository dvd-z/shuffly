import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import './Playlist.css';

const spotifyWebApi = new Spotify();

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shuffling: false
    };
  }

  fetchNewArt(id) {
    this.props.fetchNewArt(id);
  }

  shufflePlaylist() {
    this.setState({
      shuffling: true
    });

    let i = this.props.playlist.tracks.total - 1;

    let swapInterval = setInterval(() => {
      const j = Math.floor(Math.random() * (i + 1));
      this.swap(i, j);

      i--;

      if (i <= 0) {
        clearInterval(swapInterval);

        this.fetchNewArt(this.props.id);
        this.setState({
          shuffling: false
        });
      }
    }, 125);
  }

  swap(to, from) {
    spotifyWebApi
      .reorderTracksInPlaylist(this.props.playlist.id, from, to + 1)
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }

  render() {
    return (
      <div>
        <div id='playlist-container'>
          <div id='playlist-metadata'>
            <img id='playlist-art' alt={this.props.playlist.name + ' album art'}
              src={this.props.playlist.images?.[0]?.url ?? 'data:,'} height='64'>
            </img>
            <span id='playlist-descriptions'>
              <span id='playlist-title'>
                <a id='playlist-link'
                  href={this.props.playlist.external_urls.spotify}>{this.props.playlist.name}
                </a>
              </span>
              <div id='playlist-songs-container'>
                <span id='playlist-songs'>{this.props.playlist.tracks.total}
                </span>
                <span id='songs-text'>&nbsp;songs</span>
              </div>
            </span>
          </div>
          <button id='playlist-shuffle' disabled={this.state.shuffling} className='SpotifyButton ShuffleButton'
            onClick={() => this.shufflePlaylist()}>{this.state.shuffling ? 'SHUFFLING...' : 'SHUFFLE'}
          </button>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default Playlist;