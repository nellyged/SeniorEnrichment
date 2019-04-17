import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEditStudent } from './store';

const mapDispatchToProps = dispatch => {
  return {
    createStudent: (student, history) =>
      dispatch(addEditStudent(student, history)),
  };
};

class StudentForm extends Component {
  constructor(props) {
    super(props);
    if (!props.id) {
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        gpa: '',
        errors: [],
      };
    } else {
      const { student } = props;
      this.state = {
        firstName: student ? student.firstName : '',
        lastName: student ? student.lastName : '',
        email: student ? student.email : '',
        gpa: student ? student.gpa : '',
        errors: [],
      };
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.id && !prevProps.student && this.props.student) {
      const { student } = this.props;
      this.setState({
        firstName: student ? student.firstName : '',
        lastName: student ? student.lastName : '',
        email: student ? student.email : '',
        gpa: student ? student.gpa : '',
        errors: [],
      });
    }
  }
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  onSubmit = ev => {
    ev.preventDefault();
    const { createStudent, history } = this.props;
    const student = { ...this.state };
    if (this.props.id) {
      student.id = this.props.id;
    }
    createStudent(student, history).catch(ex => {
      this.setState({ errors: ex.response.data.errors });
    });
  };
  render() {
    const { firstName, lastName, email, gpa, errors } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form onSubmit={onSubmit}>
        {!!errors.length && (
          <ul className="alert alert-danger">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
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
          {this.props.id ? 'Edit' : 'Create'}
        </button>
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(StudentForm);
