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
import CampusForm from './CampusForm';
import StudentForm from './StudentForm';

const mapStateToProps = state => {
  return { campuses: state.campuses, students: state.students };
};

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
    const { campuses, students } = this.props;
    return (
      <Router>
        <h1>Welcome To BlackBoard!!!</h1>
        <Route component={Nav} />
        <Switch>
          <Route exact path="/campuses" component={Campuses} />
          <Route exact path="/campuses/create" component={CampusForm} />
          <Route
            path="/campuses/create/:id"
            render={({ history, match }) => (
              <CampusForm
                id={match.params.id}
                campus={campuses.find(
                  campus => campus.id === match.params.id * 1
                )}
                history={history}
              />
            )}
          />
          <Route path="/campuses/:id" component={Campus} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/students/create" component={StudentForm} />
          <Route
            path="/students/create/:id"
            render={({ match, history }) => (
              <StudentForm
                id={match.params.id}
                student={students.find(
                  student => student.id === match.params.id * 1
                )}
                history={history}
              />
            )}
          />
          <Route path="/students/:id" component={Student} />
          <Redirect exact path="/" to="/campuses" />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
