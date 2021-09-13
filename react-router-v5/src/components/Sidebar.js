import * as React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import slug from 'slug';

function CustomLink ({ to, children }) {
  const match = useRouteMatch(to.pathname)

  return (
    <li style={{ fontWeight: match ? 'bold' : 'normal' }}>
      <Link to={to}>{children}</Link>
    </li>
  )
}

export default function Sidebar ({ title, list }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <div className="container">
      <h3 className="header">{title}</h3>
      <ul className="sidebar-list">
        {
          list.map((item) => (
            <CustomLink
              key={item}
              to={{
                pathname: `${url}/${slug(item)}`,
                search: location.search,
              }}
            >
              {item.toUpperCase()}
            </CustomLink>
          ))
        }
      </ul>
    </div>
  )
};
