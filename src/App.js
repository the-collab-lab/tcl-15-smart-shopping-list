import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from './components/List';
import AddItem from './components/AddItem';
import Navigation from './components/Navigation';
import './components/main.css';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/add" component={AddItem} />
          </Switch>
        </div>
        <div className="navbar">
          <Navigation />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
