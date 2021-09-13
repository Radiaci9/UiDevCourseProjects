import * as React from 'react';
import { Link, Route, useRouteMatch, useParams } from 'react-router-dom';

import TeamLogo from './TeamLogo';
import Sidebar from './Sidebar';
import Loading from './Loading';

import useTeamNames from '../hooks/useTeamNames';
import useTeam from '../hooks/useTeam';

function Team () {
  const { teamName } = useParams();
  const { loading, response: team } = useTeam(teamName);

  if (loading) return <Loading />;

  if (!team) return <div className="sidebar-instruction">Team not found.</div>

  return (
    <div style={{width: "100%"}}>
      <TeamLogo className="center" width="400px" id={team.id} />
      <h1 className="medium-header">{team.name}</h1>
      <ul className="info-list row">
        <li>Est.<div>{team.established}</div></li>
        <li>Manager<div>{team.manager}</div></li>
        <li>Coach<div>{team.coach}</div></li>
      </ul>
      <Link className="center btn-main" to={`/${team.id}`}>{team.name} Team Page</Link>
    </div>
  )
};

export default function Teams () {
  const { loading, response: teamNames } = useTeamNames();
  const { path } = useRouteMatch();

  if (loading) return <Loading />;

  return (
    <div className="container two-column">
      <Sidebar title="Teams" list={teamNames}/>
      <div className="panel">
        <Route exact path={`${path}/`}>
          <div className="sidebar-instruction">Select a Team</div>
        </Route>
        <Route path={`${path}/:teamName`}>
          <Team />
        </Route>
      </div>
    </div>
  )
};
