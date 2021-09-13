import * as React from 'react';
import { Route, useRouteMatch, useParams } from 'react-router-dom';

import Sidebar from './Sidebar';
import Loading from './Loading';

import useTeamsArticles from '../hooks/useTeamsArticles';
import useArticle from '../hooks/useArticle';

function Article () {
  const { teamName, articleId } = useParams();
  console.log({ articleId, teamName })
  const { loading, response: article } = useArticle({ articleId, teamId: teamName });

  if (loading) return <Loading />;

  if (!article) return <div className="sidebar-instruction">Article not found.</div>

  return (
    <article className="article">
      <h1 className="header">{article.title}</h1>
      <p>{article.body}</p>
    </article>
  )
};

export default function TeamArticles () {
  console.log(2);
  const { teamName } = useParams();
  const { loading, response: teamArticles } = useTeamsArticles(teamName);
  const { path } = useRouteMatch();

  if (loading) return <Loading />;

  console.log(1);
  return (
    <div className="container two-column">
      <Sidebar title="Teams" list={teamArticles.map((article) => article.id)}/>
      <div className="panel">
        <Route exact path={`${path}/`}>
          <div className="sidebar-instruction">Select a Article</div>
        </Route>
        <Route path={`${path}/:articleId`}>
          <Article />
        </Route>
      </div>
    </div>
  )
};
