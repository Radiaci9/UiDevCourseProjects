import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import { Repos } from '../utils/api'

type Languages = 'All' | 'JavaScript' | 'Ruby' | 'Java' | 'CSS' | 'Python'

function LangaugesNav ({ selected, onUpdateLanguage }: { selected: Languages, onUpdateLanguage: (l: Languages) => void}) {
  const languages: Languages[] = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : undefined}
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid ({ repos }: { repos: Repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li>
                  <Tooltip text="Github username">
                    <FaUser color='rgb(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>
                      {login}
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR' 


interface PopularReducerState extends Partial<Record<Languages, Repos>> {
  error: string | null
}

interface PopularLoadingAction {
  type: 'LOADING'
}

interface PopularSuccessAction {
  type: 'SUCCESS',
  selectedLanguage: Languages,
  repos: Repos
}

interface PopularErrorAction {
  type: 'ERROR',
  error: Error
}

type PopularReducerActions = PopularLoadingAction | PopularSuccessAction | PopularErrorAction

const popularReducer = (state: PopularReducerState, action: PopularReducerActions): PopularReducerState => {
  if (action.type === LOADING) {
    return {
      ...state,
      error: null,
    }
  }
  if (action.type === SUCCESS) {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
    }
  }
  if (action.type === ERROR) {
    return {
      ...state,
      error: action.error.message
    }
  }
  throw new Error(`That action type isn't supported`)
}

export default function Popular () {
  const [selectedLanguage, setSelectedLanguage] = React.useState<Languages>('All')
  const [state, dispatch] = React.useReducer(popularReducer, {
    error: null
  })
  
  const fetchedLanguages = React.useRef<Languages[]>([])

  React.useEffect(() => {
    if (!fetchedLanguages.current.includes(selectedLanguage)) {
      dispatch({ type: LOADING })
      fetchPopularRepos(selectedLanguage)
        .then((repos) => {
          dispatch({ type: SUCCESS, selectedLanguage, repos })
          fetchedLanguages.current.push(selectedLanguage)
        })
        .catch((error) => dispatch({ type: ERROR, error }))
    }
  }, [fetchedLanguages, selectedLanguage])
  

  const isLoading = () => !state[selectedLanguage] && state.error === null

  const selectedRepos = state[selectedLanguage]

  return (
    <React.Fragment>
      <LangaugesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />

      {isLoading() && <Loading text='Fetching Repos' />}

      {state.error && <p className='center-text error'>{state.error}</p>}

      {selectedRepos && <ReposGrid repos={selectedRepos} />}
    </React.Fragment>
  )
}