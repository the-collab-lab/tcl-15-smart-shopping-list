import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import Navigation from './components/Navigation';
import Home from './components/Home';
import GuardedRoute from './components/GuardedRoute';
import { checkToken } from './lib/TokenService';
import Header from './components/Header';
import './css/components/main.css';

function App() {
  const [hasToken, setHasToken] = useState(checkToken());

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="app-inner">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home hasToken={hasToken} setHasToken={setHasToken} />
              )}
            />
            <Route exact path="/add" render={GuardedRoute(AddItem)} />
          </Switch>
        </div>
        <div className="navbar">
          <Navigation hasToken={hasToken} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
