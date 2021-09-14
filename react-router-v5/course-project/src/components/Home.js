import * as React from 'react';
import { Link } from 'react-router-dom';

import TeamLogo from './TeamLogo';
import Loading from './Loading';

import useTeamNames from '../hooks/useTeamNames';

export default function Home () {
  const { loading, response: teamNames } = useTeamNames();

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 className="large-header">Hash History Basketball League</h1>
      <h1 className="text-center">Select a team</h1>
      <div className="home-grid">
        {
          teamNames.map((name) => (
            <Link key={name} to={`/${name}`}>
              <TeamLogo width="150px" id={name} />
            </Link>
          ))
        }
      </div>
    </div>
  )
};
