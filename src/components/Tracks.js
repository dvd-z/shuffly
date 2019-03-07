import React, { Component } from 'react';
import Track from './Track';

class Tracks extends Component {

  render() {
    console.log("TRACKS");
    console.log(this.props.tracks);
    const tracks = this.props.tracks.map(item =>
      <Track
        key={item.track.id}
        track={item.track}
      />
    );
    return (
      <div>
        {tracks}
        {this.props.loadable &&
          <div>...and more</div>
        }
      </div>
    );
  }
}

export default Tracks;