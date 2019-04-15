import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCampus } from './store';

const mapStateToProps = state => {
  return { campuses: state.campuses };
};

const mapDispatchToProps = dispatch => {
  return { deleteCampus: id => dispatch(removeCampus(id)) };
};

const Campuses = ({ campuses, deleteCampus }) => {
  return (
    <div>
      <Link to="/campuses/create">
        <button className="btn btn-primary">Add New Campus</button>
      </Link>
      <br />
      <ul className="list-group" style={{ display: 'flex', marginTop: '10px' }}>
        {campuses.map(campus => (
          <li className="list-group-item" key={campus.id}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Link to={`/campuses/${campus.id}`}>
                  {campus.name}
                  <br />
                  <img src={campus.imageUrl} width="300px" />
                </Link>
              </div>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCampus(campus.id)}
                >
                  X
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campuses);
