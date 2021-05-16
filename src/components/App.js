import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Menu from './Menu';
import NotFound from './NotFound';
import getHashParams from '../functions/getHashParams';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();

    this.state = {
      params: getHashParams(),
      query: '',
    };

    if (this.state.params.access_token) {
      spotifyWebApi.setAccessToken(this.state.params.access_token);
    }
  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/app' render={
                (props) => <Menu {...props} params={this.state.params} query={this.state.query} user={this.state.user} />
              } />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;