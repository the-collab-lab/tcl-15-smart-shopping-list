import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from './components/List';
import AddItem from './components/AddItem';
import Navigation from './components/Navigation';
import './components/main.css';
import './css/App.css';
import Welcome from './components/Welcome';
import GuardedRoute from './components/GuardedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Welcome} />

            <Route exact path="/add" render={GuardedRoute(AddItem)} />

            <Route exact path="/list" render={GuardedRoute(List)} />
          </Switch>
        </div>
        <div className="navbar">
          <Navigation />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
