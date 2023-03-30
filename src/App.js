import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

export default class App extends Component {
  render() {
    return (
      <section>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route path="/carteira" render={ (props) => <Wallet { ...props } /> } />
        </Switch>
      </section>
    );
  }
}
