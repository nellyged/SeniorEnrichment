import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

const Campus = ({ campuses, students, match }) => {
  const displayCampus = campuses.find(
    campus => campus.id === match.params.id * 1
  );

  const displayStudents = students.filter(
    student => student.campusId === match.params.id * 1
  );
  return (
    <div>
      {displayCampus ? (
        <div>
          <em>
            <strong>Name:</strong>
          </em>{' '}
          {displayCampus.name} <br />
          <em>
            <strong>Address:</strong>
          </em>{' '}
          {displayCampus.address} <br />
          <em>
            <strong>Description:</strong>
          </em>{' '}
          {displayCampus.description} <br />
          <img src={displayCampus.imageUrl} style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <h6>Campus Not Found</h6>
          <br />
        </div>
      )}
      {displayStudents.length ? (
        <div>
          <br />
          <h4>Students</h4>
          <ul>
            {displayStudents.map(student => (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>{student.firstName}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <h6>Studnets Not Found</h6>
          <br />
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Campus);
