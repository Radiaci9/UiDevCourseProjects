import * as React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import Navbar from './common/Navbar';
import Routes from './common/Routes';
import Loading from './common/Loading';
import SubPage from './common/SubPage';

const CustomHookPage = React.lazy(() => import('./custom-hook'));
const UseContextPage = React.lazy(() => import('./usecontext'));
const UseEffectPage = React.lazy(() => import('./useeffect'));
const UseReducerPage = React.lazy(() => import('./usereducer'));
const UseRefPage = React.lazy(() => import('./useref'));
// const UseStatePage = React.lazy(() => import('./usestate'));
const UseStateThemePage = React.lazy(() => import('./usestate/theme'));
const UseStateTodosPage = React.lazy(() => import('./usestate/todos'));
const UseStateShowHidePage = React.lazy(() => import('./usestate/show-hide'));

const readmeList = [
  {
    practiceName: 'usestate-practice-theme',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-theme',
  },
  {
    practiceName: 'usestate-practice-todos',
    herf: 'https://platform.ui.dev/courses/react-hooks/practice-todos' 
  },
  {
    practiceName: 'usestate-practice-show-hide',
    herf: 'https://platform.ui.dev/courses/react-hooks/practice-show-hide' 
  },
  {
    practiceName: 'useeffect-practice-character-limit',
    herf: '' 
  },
  {
    practiceName: 'useeffect-practice-wait-delay',
    herf: '' 
  },
  {
    practiceName: 'useeffect-practice-fetch',
    herf: '' 
  },
  {
    practiceName: 'custom-hook-practice-usewait',
    herf: '' 
  },
  {
    practiceName: 'custom-hooks-practice-browser-dimensions',
    herf: '' 
  },
  {
    practiceName: 'custom-hook-practice-usefetch',
    herf: '' 
  },
  {
    practiceName: 'usereducer-practice-usefetch',
    herf: '' 
  },
  {
    practiceName: 'useref-practice-form',
    herf: '' 
  },
  {
    practiceName: 'useref-practice-click-game',
    herf: '' 
  },
  {
    practiceName: 'usecontext-practice-local',
    herf: '' 
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
        component: Home,
      },
      {
        path: '/wait-delay',
        linkName: 'Wait delay',
        component: Home,
      },
      {
        path: '/fetch',
        linkName: 'Fetch',
        component: Home,
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