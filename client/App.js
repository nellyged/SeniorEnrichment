import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses, fetchStudents } from './store';
import Nav from './Nav';
import Campuses from './Campuses';
import Students from './Students';
import Campus from './Campus';
import Student from './Student';

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialCampuses: () => dispatch(fetchCampuses()),
    fetchInitalStudents: () => dispatch(fetchStudents()),
  };
};

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialCampuses();
    this.props.fetchInitalStudents();
  }
  render() {
    return (
      <Router>
        Welcome To BlackBoard!!!
        <Route component={Nav} />
        <Switch>
          <Route exact path="/students" component={Students} />
          <Route exact path="/campuses" component={Campuses} />
          <Route path="/campuses/:id" component={Campus} />
          <Route path="/students/:id" component={Student} />
          <Redirect path="/" to="/campuses" />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
