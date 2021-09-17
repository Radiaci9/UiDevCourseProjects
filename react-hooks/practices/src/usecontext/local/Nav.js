import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import LocaleContext from "./LocaleContext";

function EnglishNav({ toggleLocale, path }) {
  return (
    <nav className="local-nav">
      <ul>
        <li>
          <Link to={`${path}/`}>Home</Link>
        </li>
        <li>
          <Link to={`${path}/blog`}>Blog</Link>
        </li>
        <li>
          <Link to={`${path}/about`}>About</Link>
        </li>
      </ul>
      <button className="localBtn" onClick={toggleLocale}>Español</button>
    </nav>
  );
}

function SpanishNav({ toggleLocale, path }) {
  return (
    <nav className="local-nav">
      <ul>
        <li>
          <Link to={`${path}/`}>Inicio</Link>
        </li>
        <li>
          <Link to={`${path}/blog`}>Blog</Link>
        </li>
        <li>
          <Link to={`${path}/about`}>Sobre Nosotros</Link>
        </li>
      </ul>
      <button className="localBtn" onClick={toggleLocale}>English</button>
    </nav>
  );
}

export default function Nav() {
  const { locale, toggleLocale } = React.useContext(LocaleContext)
  const { path } = useRouteMatch()
  return (
    locale === "en" ? (
      <EnglishNav toggleLocale={toggleLocale} path={path} />
    ) : (
      <SpanishNav toggleLocale={toggleLocale} path={path} />
    )
  );
}
