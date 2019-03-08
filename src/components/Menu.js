import React, { Component } from 'react';
import getHashParams from '../functions/getHashParams';
import Playlists from './Playlists';
import SearchBar from './SearchBar';
import User from './User';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      params: getHashParams(),
      query: '',
      user: ''
    };
    this.propagateQuery = this.propagateQuery.bind(this);
    if (this.state.params.access_token) {
      spotifyWebApi.setAccessToken(this.state.params.access_token);
    }
  }

  componentDidMount() {
    spotifyWebApi.getMe()
      .then(res => this.setState({ user: res }))
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }

  propagateQuery(query) {
    this.setState({
      query: query
    })
  }

  render() {
    return (
      <div>
        <div>
          <SearchBar propagateQuery={this.propagateQuery} query={this.state.query} />
          <User user={this.state.user} />
        </div>
        <Playlists params={this.state.params} query={this.state.query} userId={this.state.user ? this.state.user.id : ''} />
      </div>
    );
  }
}

export default Menu;