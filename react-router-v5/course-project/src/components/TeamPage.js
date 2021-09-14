import * as React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';

import TeamLogo from './TeamLogo';
import Loading from './Loading';

import useTeam from '../hooks/useTeam';
import useTeamsArticles from '../hooks/useTeamsArticles';

function useTeamPageDate (teamName) {
  const { loading: teamLoading, response: team } = useTeam(teamName);
  const { loading: teamArticlesLoading, response: teamArticles } = useTeamsArticles(teamName);

  return {
    loading: teamLoading || teamArticlesLoading,
    team,
    teamArticles
  }
};

export default function TeamPage () {
  const { teamName } = useParams();
  const { url } = useRouteMatch();
  const { loading, team, teamArticles } = useTeamPageDate(teamName);

  if (loading) return <Loading />;

  if (!team) return <div className="sidebar-instruction">Team not found.</div>

  return (
    <div className="panel">
      <TeamLogo className="center" width="400px" id={team.id} />
      <h1 className="medium-header">{team.name}</h1>
      <h4 style={{ margin: '5px' }}>
        <Link to={{
          pathname: '/players',
          search: `?teamId=${team.id}`
        }}>
          View Roster
        </Link>
      </h4>
      <h4>Championships</h4>
      <ul className="championships">  
        {
          team.championships.map((year) => (
            <li key={year}>{year}</li>
          ))
        }
      </ul>
      <ul className="info-list row" style={{ width: "100%"}}>
        <li>Est.<div>{team.established}</div></li>
        <li>Manager<div>{team.manager}</div></li>
        <li>Coach<div>{team.coach}</div></li>
        <li>Record<div>{team.wins} - {team.losses}</div></li>
      </ul>
      <h1 className="medium-header">Articles</h1>
      {console.log(url)}
      <ul className="articles">
        {
          teamArticles.map((article) => (
            <li key={article.id}>
              <Link to={`${url}/articles/${article.id}`}>
                <h4 className="article-title">{article.title}</h4>
                <div className="article-date">{new Date(article.date).toLocaleDateString()}</div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
};
