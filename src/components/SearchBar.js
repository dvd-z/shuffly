import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value
    });
    this.props.propagateQuery(e.target.value);
  }

  render() {
    return (
      <div id="search-wrapper">
        <input className="search" type="text" value={this.state.query} onChange={this.handleChange} placeholder="Search"></input>
      </div>
    );
  }
}

export default SearchBar;