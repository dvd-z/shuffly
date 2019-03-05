import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './Login';
import NotFound from './NotFound';
import Playlists from './Playlists';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shuffly</h1>
        </header>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/app" component={Playlists} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;