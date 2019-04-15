import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { campuses: state.campuses };
};

const Campuses = ({ campuses }) => {
  return (
    <ul>
      {campuses.map(campus => (
        <li key={campus.id}>
          <Link to={`/campuses/${campus.id}`}>
            {campus.name}
            <br />
            <img src={campus.imageUrl} width="300px" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default connect(mapStateToProps)(Campuses);
