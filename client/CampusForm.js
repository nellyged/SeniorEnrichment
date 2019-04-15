import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCampus } from './store';

const mapDispatchToProps = dispatch => {
  return {
    createCampus: (campus, history) => dispatch(addCampus(campus, history)),
  };
};

class CampusForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: '',
    };
  }
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
    console.log(this.state);
  };
  onSubmit = ev => {
    ev.preventDefault();
    const { history, createCampus } = this.props;
    createCampus(this.state, history);
  };
  render() {
    const { name, address, description } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
        <br />
        <input
          className="form-control"
          placeholder="Address"
          type="text"
          name="address"
          value={address}
          onChange={onChange}
        />
        <br />
        <textarea
          className="form-control"
          placeholder="Description"
          type="text"
          name="description"
          value={description}
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
)(CampusForm);
