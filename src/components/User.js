import React, { Component } from 'react';

class User extends Component {

  render() {
    let imageUrl, displayName;
    if (this.props.user) {
      imageUrl = this.props.user.images[0].url;
      displayName = this.props.user.display_name;
    }
    
    return (
      <div>
        <img alt="Profile" src={imageUrl} height="64"></img>
        <p>{displayName}</p>
      </div>
    );
  }
}

export default User;