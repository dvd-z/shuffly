import React, { Component } from 'react';

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
      <div>
        <img alt="Search icon" src=""></img>
        <input type="text" value={this.state.query} onChange={this.handleChange} placeholder="Filter"></input>
      </div>
    );
  }
}

export default SearchBar;