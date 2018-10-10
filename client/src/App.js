import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import './App.css';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      playlists: []
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

  getPlaylists() {
    if (!spotifyWebApi.getAccessToken()) {
      return;
    }

    spotifyWebApi.getUserPlaylists()
      .then(res => {
        console.log(res);
        this.setState({
          playlists: res.items
        });
      })
      .catch(err => {
        var response = JSON.parse(err.response);
        alert(response.error.message);
      });
  }

  render() {
    return (
      <div className="App">
        <form action="http://localhost:8888">
          <input type="submit" value="Login with Spotify" />
        </form>
        <button onClick={() => this.getPlaylists()}>
          Get playlists
        </button>
      </div>
    );
  }
}

export default App;
