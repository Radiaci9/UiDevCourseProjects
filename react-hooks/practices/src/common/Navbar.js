import * as React from 'react'
import { NavLink, useRouteMatch } from "react-router-dom"
import { formatPath } from './functions';

export default function Navbar ({ className = '', routes }) {
  const { path } = useRouteMatch();

  return (
    <nav className={className}>
      {
        routes.map((item) => (
          <NavLink exact key={item.path} to={formatPath(`${path}/${item.path}`)}>{item.linkName}</NavLink>
        ))
      }
    </nav>
  )
}