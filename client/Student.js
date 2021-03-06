import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

const Student = ({ students, campuses, match }) => {
  const displayStudent = students.find(
    student => student.id === match.params.id * 1
  );

  let displayCampus;
  if (displayStudent) {
    displayCampus = campuses.find(
      campus => campus.id === displayStudent.campusId
    );
  }
  return (
    <div>
      {displayStudent ? (
        <div>
          <em>
            <strong>Name:</strong>
          </em>{' '}
          {`${displayStudent.firstName} ${displayStudent.lastName}`} <br />
          <em>
            <strong>Email:</strong>
          </em>{' '}
          {`${displayStudent.email}`} <br />
          <em>
            <strong>GPA:</strong>
          </em>{' '}
          {`${displayStudent.gpa}`} <br />
          <img src={displayStudent.imageUrl} style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <h6>Student Not Found</h6>
          <br />
        </div>
      )}
      {displayCampus ? (
        <div>
          <br />
          <h4>Campus</h4>
          <Link to={`/campuses/${displayCampus.id}`}>
            {displayCampus.name} <br />
            <img src={displayCampus.imageUrl} style={{ maxWidth: '100%' }} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <h6>Student Has Not Yet Selected A Campus</h6>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Student);
