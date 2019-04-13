import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { campuses: state.campuses };
};

const Campuses = ({ campuses }) => {
  return (
    <ul>
      {campuses.map(campus => (
        <li key={campus.id}>
          {campus.name}
          <br />
          <img src={campus.imageUrl} />
        </li>
      ))}
    </ul>
  );
};

export default connect(mapStateToProps)(Campuses);
