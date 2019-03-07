import React, { Component } from 'react';

class Track extends Component {

  render() {
    console.log("RENDER");
    console.log(this.props);
    return (
      <div>
        <img alt={this.props.track.album.name + " album art"} src={this.props.track.album.images[0].url} height="64"></img>
        {this.props.track.name} - {this.props.track.artists[0].name}
        <a href={this.props.track.external_urls.spotify}>Hyperlink</a>
      </div>
    );
  }
}

export default Track;