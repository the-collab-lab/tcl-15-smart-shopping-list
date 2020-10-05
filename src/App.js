import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from './components/List';
import AddItem from './components/AddItem';
import Navigation from './components/Navigation';
import './components/main.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/add" component={AddItem} />
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
