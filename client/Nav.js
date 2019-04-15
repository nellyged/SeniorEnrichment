import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location: { pathname } }) => {
  const tabs = [
    {
      title: 'Home',
      path: '/campuses',
    },
    {
      title: 'Students',
      path: '/students',
    },
  ];
  return (
    <ul
      className="nav nav-pills"
      style={{ marginTop: '20px', marginBottom: '20px' }}
    >
      {tabs.map(tab => (
        <li className="nav-item" key={tab.title}>
          <Link
            to={tab.path}
            className={`nav-link${tab.path === pathname ? ' active' : ''}`}
          >
            {tab.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
