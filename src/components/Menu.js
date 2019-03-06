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
      user: ''
    };
    if (this.state.params.access_token) {
      spotifyWebApi.setAccessToken(this.state.params.access_token);
    }
  }

  componentDidMount() {
    if (!spotifyWebApi.getAccessToken()) {
      console.error('No Spotify access token. Please log in again.');
      return;
    }

    spotifyWebApi.getMe()
      .then(res => this.setState({ user: res }))
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }

  render() {
    return (
      <div>
        <User user={this.state.user} />
        <Playlists params={this.state.params} userId={this.state.user ? this.state.user.id : ''} />
      </div>
    );
  }
}

export default Menu;