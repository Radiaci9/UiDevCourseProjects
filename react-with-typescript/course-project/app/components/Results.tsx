import React from 'react'
import { battle, Player, Players } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { User } from '../utils/api'


function ProfileList ({ profile }: { profile: User}) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
}

const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR' 

interface ProfileReducerState {
  winner: Player | null,
  loser: Player | null,
  error: string | null,
  loading: boolean,
}

interface ProfileSuccessAction {
  type: 'SUCCESS'
  players: Players,
}

interface ProfileErrorAction {
  type: 'ERROR'
  message: string,
}

type ProfileReducerActions = ProfileSuccessAction | ProfileErrorAction

const profileReducer = (state: ProfileReducerState, action: ProfileReducerActions): ProfileReducerState => {
  if (action.type === SUCCESS) {
    return {
      winner: action.players[0],
      loser: action.players[1],
      error: null,
      loading: false
    }
  }
  if (action.type === ERROR) {
    return {
      ...state,
      error: action.message,
      loading: false
    }
  }
  throw new Error(`That action type isn't supported`)
}

export default function Results ({ location }: { location: { search: string }}) {
  const { playerOne, playerTwo } = queryString.parse(location.search)

  const [state, dispatch] = React.useReducer(profileReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true
  })

  React.useEffect(() => {
    battle([ playerOne, playerTwo ] as [string, string])
      .then((players) => dispatch({ type: SUCCESS, players }))
      .catch(({ message }) => dispatch({ type: ERROR, message }))
  }, [ playerOne, playerTwo ])

  const { loading, error, winner, loser } = state

  if (loading || !winner || !loser) {
    return <Loading text='Battling' />
  }

  if (error) {
    return (
      <p className='center-text error'>{error}</p>
    )
  }

  return (
    <React.Fragment>
      <div className='grid space-around container-sm'>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile}/>
        </Card>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile}/>
        </Card>
      </div>
      <Link
        to='/battle'
        className='btn dark-btn btn-space'>
          Reset
      </Link>
    </React.Fragment>
  )
}