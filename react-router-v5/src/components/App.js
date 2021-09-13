import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import FourOhFour from './FourOhFour';
import Home from './Home';
import Navbar from './Navbar';
import Players from './Players';
import Teams from './Teams';
import TeamPage from './TeamPage';
import TeamArticles from './TeamArticles';

export default function App () {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/players">
          <Players />
        </Route>
        <Route path="/teams">
          <Teams />
        </Route>
        <Route exact path="/:teamName">
          <TeamPage />
        </Route>
        <Route path="/:teamName/articles">
          <TeamArticles />
        </Route>
        <Route path="*">
          <FourOhFour />
        </Route>
      </Switch>
    </Router>
  )
}