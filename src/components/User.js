import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div>
        {this.props.user &&
          <div>
            <img alt="Profile"
              src={this.props.user ? this.props.user.images[0].url : 'data:,'} height="64">
            </img>
            <p>{this.props.user.display_name}</p>
          </div>
        }
      </div>
    );
  }
}

export default User;