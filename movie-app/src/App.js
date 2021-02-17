import React from 'react';

import './App.css';

import Home from './components/Home';
import Detail from './components/Detail';
import List from './components/List';
import Newest from './components/Newest';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (

    <Router>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/list" component={List}/>
              <Route path="/movie/:id" component={Detail}/>
              <Route path="/newest" component={Newest}/>
          </Switch>
    </Router>

  );
}

export default App;
