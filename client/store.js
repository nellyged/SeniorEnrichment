import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {
  campuses: [],
  students: [],
};

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return { ...state, campuses: action.campuses };
    case GET_STUDENTS:
      return { ...state, students: action.students };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(createLogger({ collapsed: true }), thunk))
);

export { store, fetchCampuses, fetchStudents };
