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
      tracks: []
    };
  }

  handleClick() {
    if (this.state.selected === null) {
      const options = {
        fields: 'items(track(album(images(url)),artists(name),external_urls,id,name)),limit,total',
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
    this.setState({
      selected: !this.state.selected
    });
  }

  // shufflePlaylist(length) {
  //   for (let i = length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
  //   }
  //   return playlist;
  // }

  render() {
    return (
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
    );
  }
}

export default Playlist;