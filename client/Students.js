import React from 'react';
import { Link } from 'react-router-dom';
import { removeStudent } from './store';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { students: state.students, campuses: state.campuses };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: id => dispatch(removeStudent(id)),
  };
};

const Students = ({ students, campuses, deleteStudent }) => {
  return (
    <div>
      <Link to="/students/create">
        <button className="btn btn-primary">Add New Student</button>
      </Link>
      <ul className="list-group" style={{ display: 'flex', marginTop: '10px' }}>
        {students.map(student => (
          <li className="list-group-item" key={student.id}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Link to={`/students/${student.id}`}>
                  {`${student.firstName} ${student.lastName}`}
                </Link>
                <br />
                {student.campusId ? (
                  <Link to={`/campuses/${student.campusId}`}>
                    {
                      campuses.find(campus => campus.id === student.campusId)
                        .name
                    }
                  </Link>
                ) : (
                  ''
                )}
              </div>
              <button
                className="btn btn-danger"
                onClick={() => deleteStudent(student.id)}
              >
                X
              </button>
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
)(Students);
