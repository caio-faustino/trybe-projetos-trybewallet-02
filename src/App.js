import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/carteira" render={ (props) => <Wallet { ...props } /> } />
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        </Switch>
      </main>
    );
  }
}

export default App;