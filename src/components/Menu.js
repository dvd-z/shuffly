import React, { Component } from 'react';
import getHashParams from '../functions/getHashParams';
import Playlists from './Playlists';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      params: getHashParams(),
      user: {}
    };
    if (this.state.params.access_token) {
      spotifyWebApi.setAccessToken(this.state.params.access_token);
    }
  }

  componentDidMount() {
    if (!spotifyWebApi.getAccessToken()) {
      alert('No Spotify access token. Please log in again.');
      return;
    }

    spotifyWebApi.getMe()
      .then(res => {
        this.setState({ user: res });
      })
      .catch(err => {
        const response = JSON.parse(err.response);
        alert(response.error);
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.user.display_name}</p>
        <Playlists params={this.state.params} />
      </div>
    );
  }
}

export default Menu;