import React, { Component } from 'react';
import User from './User';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Header-title">Shuffly</h1>
        <User user={this.props.user}></User>
      </header>
    );
  }
}

export default Header;