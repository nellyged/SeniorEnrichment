import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { students: state.students };
};

const Students = ({ students }) => {
  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>{student.firstName}</li>
      ))}
    </ul>
  );
};

export default connect(mapStateToProps)(Students);
