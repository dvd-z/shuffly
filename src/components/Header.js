import React, { Component } from 'react';
import User from './User';
import vector from '../images/vector.png';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div className="Logo-container">
          <img alt="Shuffly logo" id="Vector" src={vector}></img>
          <div className="Line"></div>
          <p className="Header-title">Shuffly</p>
        </div>
        <User user={this.props.user}></User>
      </header>
    );
  }
}

export default Header;