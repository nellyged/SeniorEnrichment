/* eslint-disable default-case */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_STUDENTS = 'GET_STUDENTS';

const getCampuses = campuses => ({
  type: GET_CAMPUSES,
  campuses,
});

const getStudents = students => ({
  type: GET_STUDENTS,
  students,
});

const fetchCampuses = () => {
  return dispatch => {
    return axios
      .get('/api/campuses')
      .then(response => response.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      });
  };
};

const addCampus = (campus, history) => {
  return dispatch => {
    return axios.post('/api/campuses', campus).then(() => {
      dispatch(fetchCampuses());
      history.push('/campuses');
    });
  };
};

const removeCampus = id => {
  return dispatch => {
    return axios.delete(`/api/campuses/${id}`).then(() => {
      dispatch(fetchCampuses());
    });
  };
};

const fetchStudents = () => {
  return dispatch => {
    return axios
      .get('/api/students')
      .then(response => response.data)
      .then(students => {
        dispatch(getStudents(students));
      });
  };
};

const addStudent = (student, history) => {
  return dispatch => {
    return axios.post('/api/students', student).then(() => {
      dispatch(fetchStudents());
      history.push('/students');
    });
  };
};

const removeStudent = id => {
  return dispatch => {
    return axios.delete(`/api/students/${id}`).then(() => {
      dispatch(fetchStudents());
    });
  };
};

const campuses = (state = [], action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
};

const students = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    default:
      return state;
  }
};

const reducer = combineReducers({
  campuses,
  students,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(createLogger({ collapsed: true }), thunk))
);

export {
  store,
  fetchCampuses,
  fetchStudents,
  addCampus,
  addStudent,
  removeCampus,
  removeStudent,
};
