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

  componentDidMount() {
    if (Object.entries(this.state.params).length !== 0) {
      this.postParams()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
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

  postParams = async () => {
    const response = await fetch('/params', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.params)
    });
    const status = await response.status;
    return status;
  }

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