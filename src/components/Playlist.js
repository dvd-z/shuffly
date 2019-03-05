import React, { Component } from 'react';

class Playlist extends Component {

  render() {
    return (
      <li>
        <img alt={this.props.playlist.name + " album art"} src={this.props.playlist.images[0].url} height="64"></img>
        {this.props.playlist.name}
      </li>
    );
  }
}

export default Playlist;