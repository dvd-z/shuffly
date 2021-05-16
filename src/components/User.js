import React, { Component } from 'react';
import './User.css';

class User extends Component {
  render() {
    let userContainer;

    if (this.props.user) {
      let userImg;

      if (this.props.user.images[0]) {
        userImg = (
          <img alt='Profile'
            src={this.props.user.images[0].url} height='64'
            id='display-picture'>
          </img>
        );
      }

      userContainer = (
        <div id='user-container'>
          {userImg}
          <p>{this.props.user.display_name}</p>
        </div>
      );
    }

    return (
      <>
        {userContainer}
      </>
    );
  }
}

export default User;