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
      <ul
        className="list-group"
        style={{
          display: 'flex',
          marginTop: '10px',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {students.map(student => (
          <li className="list-group-item" key={student.id}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <div>
                <Link to={`/students/${student.id}`}>
                  <img src={student.imageUrl} />
                  <br />
                  {`${student.firstName} ${student.lastName}`}
                </Link>
                <br />
                {student.campusId && campuses.length ? (
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space',
                  marginTop: '10px',
                }}
              >
                <Link
                  to={`/students/create/${student.id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
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
)(Students);
