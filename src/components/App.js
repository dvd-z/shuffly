import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Playlists from './Playlists';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shuffly</h1>
        </header>
        <Login />
        <Playlists />
      </div>
    );
  }
}

export default App;