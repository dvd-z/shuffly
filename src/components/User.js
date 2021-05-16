import React, { Component } from 'react';
import './User.css';

class User extends Component {
  render() {
    if (!this.props.user) {
      return null;
    }

    let userImg;

    if (this.props.user.images?.[0]?.url) {
      userImg = (
        <img alt='Profile'
          src={this.props.user.images[0].url} height='64'
          id='display-picture'>
        </img>
      );
    }

    return (
      <div id='user-container'>
        {userImg}
        <p>{this.props.user.display_name}</p>
      </div>
    );
  }
}

export default User;