import * as React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import Navbar from './common/Navbar';
import Routes from './common/Routes';
import Loading from './common/Loading';
import SubPage from './common/SubPage';

const UseStateThemePage = React.lazy(() => import('./usestate/theme'));
const UseStateTodosPage = React.lazy(() => import('./usestate/todos'));
const UseStateShowHidePage = React.lazy(() => import('./usestate/show-hide'));

const UseEffectCharacterLimitPage = React.lazy(() => import('./useeffect/character-limit'));
const UseEffectWaitDelayPage = React.lazy(() => import('./useeffect/wait-delay'));
const UseEffectFetchPage = React.lazy(() => import('./useeffect/fetch'));

const readmeList = [
  {
    practiceName: 'usestate-practice-theme',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-theme',
  },
  {
    practiceName: 'usestate-practice-todos',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-todos' 
  },
  {
    practiceName: 'usestate-practice-show-hide',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-show-hide' 
  },
  {
    practiceName: 'useeffect-practice-character-limit',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-character-limit' 
  },
  {
    practiceName: 'useeffect-practice-wait-delay',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-wait-delay' 
  },
  {
    practiceName: 'useeffect-practice-fetch',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-api-requests' 
  },
  {
    practiceName: 'custom-hook-practice-usewait',
    href: '' 
  },
  {
    practiceName: 'custom-hooks-practice-browser-dimensions',
    href: '' 
  },
  {
    practiceName: 'custom-hook-practice-usefetch',
    href: '' 
  },
  {
    practiceName: 'usereducer-practice-usefetch',
    href: '' 
  },
  {
    practiceName: 'useref-practice-form',
    href: '' 
  },
  {
    practiceName: 'useref-practice-click-game',
    href: '' 
  },
  {
    practiceName: 'usecontext-practice-local',
    href: '' 
  },
]

const Home = () => (
  <div>
    <h2>Practices:</h2>
    <ul>
      {
        readmeList.map((item) => (
          <li key={item.practiceName}>
            {item.practiceName} - <a href={item.href}>Source</a>
          </li>
        ))
      }
    </ul>
  </div>
);

const routes = [
  {
    path: '/',
    component: Home,
    linkName: 'Home',
    exact: true
  },
  {
    path: '/usestate',
    linkName: 'useState',
    component: SubPage,
    routes: [
      {
        path: '/theme',
        linkName: 'Theme',
        component: UseStateThemePage,
      },
      {
        path: '/todos',
        linkName: 'Todos',
        component: UseStateTodosPage,
      },
      {
        path: '/show-hide',
        linkName: 'Show/Hide',
        component: UseStateShowHidePage,
      }
    ]
  },
  {
    path: '/useeffect',
    linkName: 'useEffect',
    component: SubPage,
    routes: [
      {
        path: '/character-limit',
        linkName: 'Character limit',
        component: UseEffectCharacterLimitPage,
      },
      {
        path: '/wait-delay',
        linkName: 'Wait delay',
        component: UseEffectWaitDelayPage,
      },
      {
        path: '/fetch',
        linkName: 'Fetch',
        component: UseEffectFetchPage,
      },
    ]
  },
  {
    path: '/custom-hook',
    linkName: 'Custom hook',
    component: SubPage,
    routes: [
      {
        path: '/usewait',
        linkName: 'Usewait',
        component: Home,
      },
      {
        path: '/browser-dimensions',
        linkName: 'Browser dimensions',
        component: Home,
      },
      {
        path: '/usefetch',
        linkName: 'Usefetch',
        component: Home,
      },
    ]
  },
  {
    path: '/usereducer',
    linkName: 'useReducer',
    component: SubPage,
    routes: [
      {
        path: '/usefetch',
        linkName: 'Usefetch',
        component: Home,
      },
    ]
  },
  {
    path: '/useref',
    linkName: 'useRef',
    component: SubPage,
    routes: [
      {
        path: '/form',
        linkName: 'Form',
        component: Home,
      },
      {
        path: '/click-game',
        linkName: 'Click game',
        component: Home,
      },
    ]
  },
  {
    path: '/usecontext',
    linkName: 'useContext',
    component: SubPage,
    routes: [
      {
        path: '/local',
        linkName: 'Local',
        component: Home,
      },
    ]
  },
]
  
export default function App () {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Navbar routes={routes} />

        <Routes routes={routes} />
      </React.Suspense>
    </Router>
  )
}