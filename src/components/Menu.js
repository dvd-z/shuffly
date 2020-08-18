import React, { Component } from 'react';
import Playlists from './Playlists';
import SearchBar from './SearchBar';
import User from './User';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.params,
      query: this.props.query,
      userId: this.props.userId
    };
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
        <div>
          <SearchBar propagateQuery={this.propagateQuery} query={this.props.query} />
          <User user={this.props.user}></User>
        </div>
        <Playlists params={this.props.params} query={this.props.query} userId={this.props.user ? this.props.user.id : ""} />
      </div>
    );
  }
}

export default Menu;