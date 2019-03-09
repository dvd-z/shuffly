import React, { Component } from 'react';
import Tracks from './Tracks';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadable: false,
      selected: null,
      shuffling: false,
      tracks: []
    };
  }

  handleClick() {
    if (this.state.selected === null) {
      const options = {
        fields: 'items(track(album(images(url)),artists(name),external_urls,id,name)),limit',
        limit: 3
      };
      spotifyWebApi.getPlaylistTracks(this.props.playlist.id, options)
        .then(res => {
          this.setState({
            loadable: this.props.playlist.tracks.total > res.limit,
            tracks: res.items
          });
        })
        .catch(err => {
          const response = JSON.parse(err.response);
          console.error(response.error);
        });
    }
    this.setState({
      selected: !this.state.selected
    });
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
          selected: null,
          shuffling: false,
          tracks: []
        });
      }
    }, 100);
  }

  swap(to, from) {
    spotifyWebApi
      .reorderTracksInPlaylist(this.props.playlist.id, from, to)
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }

  render() {
    return (
      <div>
        {!this.state.shuffling ? (
          <div onClick={() => this.handleClick()}>
            <img alt={this.props.playlist.name + " album art"} src={this.props.playlist.images[0].url} height="64"></img>
            {this.props.playlist.name} - {this.props.playlist.tracks.total} songs -
            <a href={this.props.playlist.external_urls.spotify}>Hyperlink</a>
            {this.state.selected &&
              <button onClick={() => this.shufflePlaylist()}>Shuffle</button>
            }
            {this.state.selected &&
              <Tracks loadable={this.state.loadable} tracks={this.state.tracks} />
            }
          </div>
        ) : (
            <div>Shuffling...</div>
          )
        }
      </div>
    );
  }
}

export default Playlist;