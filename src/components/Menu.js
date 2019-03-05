import React, { Component } from 'react';
import getHashParams from '../functions/getHashParams';
import Playlists from './Playlists';
import User from './User';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      params: getHashParams(),
      user: null
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
      .then(res => this.setState({ user: res }))
      .catch(err => {
        const response = JSON.parse(err.response);
        alert(response.error);
      });
  }

  render() {
    let userId = null;
    if (this.state.user) {
      userId = this.state.user.id;
    }

    return (
      <div>
        <User user={this.state.user} />
        <Playlists params={this.state.params} userId={userId} />
      </div>
    );
  }
}

export default Menu;