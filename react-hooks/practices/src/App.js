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

const CustomHookUseWaitPage = React.lazy(() => import('./custom-hook/usewait'));
const CustomHookBrowserDimenstionsPage = React.lazy(() => import('./custom-hook/browser-dimensions'));
const CustomHookUseFetchPage = React.lazy(() => import('./custom-hook/usefetch'));

const UseReducerkUseFetchPage = React.lazy(() => import('./usereducer/usefetch'));

const UseRefFormPage = React.lazy(() => import('./useref/form'));
const UseRefClickGamePage = React.lazy(() => import('./useref/click-game'));

const UseContextLocalPage = React.lazy(() => import('./usecontext/local'));

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
    href: 'https://platform.ui.dev/courses/react-hooks/practice-usewait' 
  },
  {
    practiceName: 'custom-hooks-practice-browser-dimensions',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-usewindowdimensions' 
  },
  {
    practiceName: 'custom-hook-practice-usefetch',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-usefetch' 
  },
  {
    practiceName: 'usereducer-practice-usefetch',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-refactor-usefetch' 
  },
  {
    practiceName: 'useref-practice-form',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-complex-form' 
  },
  {
    practiceName: 'useref-practice-click-game',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-click-game' 
  },
  {
    practiceName: 'usecontext-practice-local',
    href: 'https://platform.ui.dev/courses/react-hooks/practice-localecontext' 
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
        component: CustomHookUseWaitPage,
      },
      {
        path: '/browser-dimensions',
        linkName: 'Browser dimensions',
        component: CustomHookBrowserDimenstionsPage,
      },
      {
        path: '/usefetch',
        linkName: 'Usefetch',
        component: CustomHookUseFetchPage,
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
        component: UseReducerkUseFetchPage,
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
        component: UseRefFormPage,
      },
      {
        path: '/click-game',
        linkName: 'Click game',
        component: UseRefClickGamePage,
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
        component: UseContextLocalPage,
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