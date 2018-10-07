import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import './App.css';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedin: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not checked',
        img: ''
      }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    // eslint-disable-next-line
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    if (!spotifyWebApi.getAccessToken()) {
      return;
    }

    spotifyWebApi.getMyCurrentPlaybackState()
      .then(res => {
        this.setState({
          nowPlaying: {
            name: res.item.name,
            img: res.item.album.images[0].url
          }
        });
      })
      .catch(err => {
        var response = JSON.parse(err.response);
        alert(response.error.message);
      });
  }

  render() {
    let image;

    if (this.state.nowPlaying.img) {
      image = <img alt='Album art' src={this.state.nowPlaying.img} style={{ width: 100 }} />;
    } else {
      image = null;
    }

    return (
      <div className="App">
        <form action="http://localhost:8888">
          <input type="submit" value="Login with Spotify" />
        </form>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          {image}
        </div>
        <button onClick={() => this.getNowPlaying()}>
          Check now playing
        </button>
      </div>
    );
  }
}

export default App;
