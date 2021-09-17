import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Blog from "./Blog";
import About from "./About";
import LocaleContext from "./LocaleContext";
import "./styles.css";

/*
  Instructions:
    You're given a full app that uses Context.Consumer
    in order to grab values off of context. Your job is to 
    refactor all of those to use the `useContext` Hook.
*/

export default function LocalPage () {
  const [locale, setLocale] = React.useState('en')
  const { path } = useRouteMatch()

  const toggleLocale = () => {
    setLocale((locale) => {
      return locale === 'en' ? 'es' : 'en'
    })
  }

  const value = React.useMemo(() => ({
    locale,
    toggleLocale
  }), [locale])

  return (
    <div className="App">
      <LocaleContext.Provider value={value}>
        <Nav />
        <Route path={`${path}/`} exact component={Home} />
        <Route path={`${path}/blog`} component={Blog} />
        <Route path={`${path}/about`} component={About} />
      </LocaleContext.Provider>
    </div>
  )
}
