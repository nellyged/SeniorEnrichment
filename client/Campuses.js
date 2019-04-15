import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { campuses: state.campuses };
};

const Campuses = ({ campuses }) => {
  return (
    <div>
      <Link to="/campuses/create">
        <button className="btn btn-primary">Add New Campus</button>
      </Link>
      <br />
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
    </div>
  );
};

export default connect(mapStateToProps)(Campuses);
