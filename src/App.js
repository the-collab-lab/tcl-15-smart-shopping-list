import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from './components/List';
import AddItem from './components/AddItem';
import Navigation from './components/Navigation';
import './css/components/main.css';
import './css/App.css';
import Home from './components/Home';
import GuardedRoute from './components/GuardedRoute';
import { checkToken } from './lib/TokenService';

function App() {
  const [hasToken, setHasToken] = useState(checkToken());

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home hasToken={hasToken} setHasToken={setHasToken} />
              )}
            />
            <Route exact path="/add" render={GuardedRoute(AddItem)} />
            <Route exact path="/list" render={GuardedRoute(List)} />
          </Switch>
        </div>
        <div className="navbar">
          <Navigation hasToken={hasToken} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
