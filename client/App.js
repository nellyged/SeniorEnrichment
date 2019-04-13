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
          <Route exact path="/" component={Campuses} />
          <Route path="/students" component={Students} />
          <Redirect path="/campuses" to="/" />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
