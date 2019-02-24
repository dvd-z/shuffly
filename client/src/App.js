import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      params: params
    };
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  login() {
    this.requestLogin()
      .then(res => window.location = res.url)
      .catch(err => console.log(err));
  }

  requestLogin = async () => {
    const response = await fetch('/login');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shuffly</h1>
        </header>
        <button onClick={() => this.login()}>Log in</button>
      </div>
    );
  }
}

export default App;