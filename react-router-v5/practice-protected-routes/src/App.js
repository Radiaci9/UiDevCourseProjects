/*
  1. Create a `PrivateRoute` component that redirects to
    the /login route if the user isn't authenticated (using 
    fakeAuth.isAuthenticated).

  2. Make /notifications a private route.

  3. Finish implementing `AuthButton` to allow the user
      to logout (using fakeAuth.signout).
*/

import * as React from "react"
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'


const useFakeAuth = () => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  const authenticate = (cb) => {
    setAuthenticated(true);
    setTimeout(cb, 100) // fake async
  };

  const signout = (cb) => {
    setAuthenticated(false);
    setTimeout(cb, 100) // fake async
  }

  return {
    isAuthenticated,
    authenticate,
    signout,
  }
}

const Home = () => <h3>Home</h3>
const Notifications = () => <h3>Notifications</h3>

function Login({ authenticate }) {
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = React.useState(false)

  const { state } = useLocation()

  const login = () => authenticate(() => {
    setRedirectToReferrer(true)
  })

  if (redirectToReferrer) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <div>
      <p>You must log in to view the page</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}


function AuthButton ({ isAuthenticated, signout }) {
  const history = useHistory();

  return isAuthenticated
    ? <p>Welcome! <button onClick={() => {
        signout(() => history.push('/'))
        }}>Sign out</button>
      </p>
    : <p>You are not logged in.</p>
}

function PrivateRoute ({children, isAuthenticated, ...rest}) {
  return (
    <Route {...rest} render={({ location }) => {
      return isAuthenticated
        ? children
        : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />
    }} />
  )
}

export default function App() {
  const { isAuthenticated, authenticate, signout } = useFakeAuth();
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
        </ul>

        <AuthButton isAuthenticated={isAuthenticated} signout={signout} />

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login authenticate={authenticate}/>
        </Route>
        <PrivateRoute isAuthenticated={isAuthenticated} path='/notifications'>
          <Notifications />
        </PrivateRoute>
      </div>
    </Router>
  )
}

