const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const { Campus, Student } = require('./db');

app.use(volleyball);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//GET All Campuses
app.get('/api/campuses', (req, res, next) => {
  Campus.findAll()
    .then(campuses => {
      res.send(campuses);
    })
    .catch(next);
});

//GET All Students
app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then(students => {
      res.send(students);
    })
    .catch(next);
});

//POST New Campus
app.post('/api/campuses', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => {
      res.send(campus);
    })
    .catch(next);
});

//POST New Student
app.post('/api/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => {
      res.send(student);
    })
    .catch(next);
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  let errors = [error];
  if (error.errors) {
    errors = error.errors.map(error => error.message);
  } else if (error.original) {
    errors = [error.original.message];
  }
  res.status(error.status || 500).send({ errors });
});

module.exports = app;