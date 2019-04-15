import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { students: state.students };
};

const Students = ({ students }) => {
  return (
    <div>
      <Link to="/students/create">
        <button className="btn btn-primary">Add New Student</button>
      </Link>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>{`${student.firstName} ${
              student.lastName
            }`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(Students);
