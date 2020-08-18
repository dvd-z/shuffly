import React, { Component } from 'react';
import Playlists from './Playlists';
import SearchBar from './SearchBar';

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
        </div>
        <Playlists params={this.props.params} query={this.props.query} userId={this.props.userId} />
      </div>
    );
  }
}

export default Menu;