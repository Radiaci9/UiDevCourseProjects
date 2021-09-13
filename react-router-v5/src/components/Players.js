import * as React from 'react';
import { Link, Route, Switch, useRouteMatch, useParams, useLocation } from 'react-router-dom';

import { parse } from 'query-string';
import slug from 'slug';

import Sidebar from './Sidebar';
import Loading from './Loading';

import usePlayers from '../hooks/usePlayers';

function Player ({ players }) {
  const { playerName } = useParams();

  const player = players.find((player) => slug(player.name) === playerName);

  if (!player) return <div className="sidebar-instruction">Player not found.</div>

  return (
    <div className="panel fade-enter-done">
      <img className="avatar" src={player.avatar} alt={player.name} />
      <h1 className="medium-header">{player.name}</h1>
      <h3 className="header">#{player.number}</h3>
      <div className="row">
        <ul className="info-list" style={{marginRight: "80px"}}>
          <li>
            Team
            <div>
              <Link to={`/${player.teamId}`}>{player.teamId[0].toUpperCase() + player.teamId.slice(1)}</Link>
            </div>
          </li>
          <li>Position<div>{player.position}</div></li>
          <li>PPG<div>{player.ppg}</div></li>
        </ul>
        <ul className="info-list">
          <li>APG<div>{player.apg}</div></li>
          <li>SPG<div>{player.spg}</div></li>
          <li>RPG<div>{player.rpg}</div></li>
        </ul>
      </div>
    </div>
  )
}

export default function Players () {
  const { path } = useRouteMatch();

  const location = useLocation();
  const { teamId } = parse(location.search); 

  const team = teamId ? teamId : null;
  const { loading, response: players } = usePlayers(team);

  if (loading) return <Loading />;

  return (
    <div className="container two-column">
      <Sidebar title="Players" list={players.map((player) => player.name)}/>
      <div className="panel">
        <Switch>
          <Route path={`${path}/:playerName`}>
            <Player players={players} />
          </Route>
          <Route path='*'>
            <div className="sidebar-instruction">Select a Player</div>
          </Route>
        </Switch>
      </div>
    </div>
  )
};
