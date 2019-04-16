import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEditCampus } from './store';

const mapDispatchToProps = dispatch => {
  return {
    createCampus: (campus, history) => dispatch(addEditCampus(campus, history)),
  };
};

class CampusForm extends Component {
  constructor(props) {
    super(props);
    if (!props.id) {
      this.state = {
        name: '',
        address: '',
        description: '',
      };
    } else {
      const { campus } = this.props;
      this.state = {
        name: campus ? campus.name : '',
        address: campus ? campus.address : '',
        description: campus ? campus.description : '',
      };
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.id && !prevProps.campus && this.props.campus) {
      const { campus } = this.props;
      this.setState({
        name: campus ? campus.name : '',
        address: campus ? campus.address : '',
        description: campus ? campus.description : '',
      });
    }
  }
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  onSubmit = ev => {
    ev.preventDefault();
    let campus = { ...this.state };
    const { history, createCampus, id } = this.props;
    if (id) {
      campus.id = id;
    }
    createCampus(campus, history);
  };
  render() {
    const { name, address, description } = this.state;
    const { id } = this.props;
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
          {id ? 'Edit' : 'Create'}
        </button>
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CampusForm);
