import React, { Component } from 'react';
import Playlists from './Playlists';
import SearchBar from './SearchBar';
import User from './User';
import './Menu.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Menu extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      user: null,
    };

    this.propagateQuery = this.propagateQuery.bind(this);
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
      <div id='menu-container'>
        <div id='header-container'>
          <SearchBar propagateQuery={this.propagateQuery} query={this.state.query} />
          <User user={this.state.user}></User>
        </div>
        <Playlists params={this.props.params} query={this.state.query}
          userId={this.state.user?.id} />
      </div>
    );
  }
}

export default Menu;