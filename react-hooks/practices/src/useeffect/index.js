import * as React from 'react'
import Navbar from '../common/Navbar';
import Routes from '../common/Routes';

export default function UseEffectPage ({ routes }) {
  return (
    <div>
      <Navbar className="sub" routes={routes}/>

      <Routes routes={routes} />
    </div>
  )
}
