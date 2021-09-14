import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navbar from './Navbar';
import Loading from './Loading';

const FourOhFour = React.lazy(() => import('./FourOhFour'));
const Home = React.lazy(() => import('./Home'));
const Players = React.lazy(() => import('./Players'));
const Teams = React.lazy(() => import('./Teams'));
const TeamPage = React.lazy(() => import('./TeamPage'));
const TeamArticles = React.lazy(() => import('./TeamArticles'));

export default function App () {
  return (
    <Router>
      <Navbar />

      <React.Suspense fallback={<Loading />}>
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
      </React.Suspense>
    </Router>
  )
}