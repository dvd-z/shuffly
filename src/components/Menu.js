import React, { Component } from 'react';
import Playlists from './Playlists';
import SearchBar from './SearchBar';
import User from './User';
import './Menu.css';

class Menu extends Component {
  constructor() {
    super();
    this.propagateQuery = this.propagateQuery.bind(this);
  }

  propagateQuery(query) {
    this.setState({
      query: query
    })
  }

  render() {
    return (
      <div>
        <div id="header-container">
          <SearchBar propagateQuery={this.propagateQuery} query={this.props.query} />
          <User user={this.props.user}></User>
        </div>
        <Playlists params={this.props.params} query={this.props.query} userId={this.props.user ? this.props.user.id : ""} />
      </div>
    );
  }
}

export default Menu;