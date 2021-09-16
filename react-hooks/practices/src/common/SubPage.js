import * as React from 'react'
import Navbar from '../common/Navbar';
import Routes from '../common/Routes';

export default function SubPage ({ routes, children = null }) {
  return (
    <div>
      <Navbar className="sub" routes={routes}/>
      {children}
      <Routes routes={routes} />
    </div>
  )
}
