import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent } from './store';

const mapDispatchToProps = dispatch => {
  return {
    createStudent: (student, history) => dispatch(addStudent(student, history)),
  };
};

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
    };
  }
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
    console.log(this.state);
  };
  onSubmit = ev => {
    ev.preventDefault();
    const { createStudent, history } = this.props;
    createStudent(this.state, history);
  };
  render() {
    const { firstName, lastName, email, gpa } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="First Name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={onChange}
        />
        <br />
        <input
          className="form-control"
          placeholder="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          onChange={onChange}
        />
        <br />
        <input
          className="form-control"
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={onChange}
        />
        <br />
        <input
          className="form-control"
          placeholder="GPA"
          type="number"
          name="gpa"
          value={gpa}
          onChange={onChange}
        />
        <br />
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(StudentForm);
