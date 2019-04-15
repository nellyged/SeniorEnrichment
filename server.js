const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});
const faker = require('faker');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const volleyball = require('volleyball');
const path = require('path');

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      isDecimal: true,
      min: 0.0,
      max: 4.0,
    },
  },
});

const getGPA = () => {
  return (Math.random() * Math.floor(4)).toFixed(2);
};

Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    Promise.all([
      Campus.create({
        name: 'FullStack',
        imageUrl:
          'https://cdn-images-1.medium.com/max/2400/1*i0rG0owbE0lDeD0dsIaw4Q.jpeg',
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.zipCode()}`,
        description: faker.lorem.paragraph(),
      }),
      Campus.create({
        name: 'NYU',
        imageUrl:
          'https://engineering.nyu.edu/sites/default/files/styles/content_header_default_1x/public/2018-09/campus-convocation-2018-sign.jpg?h=69f2b9d0&itok=u8diKT3n',
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.zipCode()}`,
        description: faker.lorem.paragraph(),
      }),
      Campus.create({
        name: 'Potsdam',
        imageUrl:
          'https://thehillnews.org/wp-content/uploads/2017/03/SUNY-Potsdam-810x355.jpg',
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.zipCode()}`,
        description: faker.lorem.paragraph(),
      }),
    ]).then(([fs, nyu, pdam]) => {
      Promise.all([
        Student.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          imageUrl: faker.fake('{{image.avatar}}'),
          gpa: getGPA(),
          campusId: fs.id,
        }),
        Student.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          imageUrl: faker.fake('{{image.avatar}}'),
          gpa: getGPA(),
          campusId: nyu.id,
        }),
        Student.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          imageUrl: faker.fake('{{image.avatar}}'),
          gpa: getGPA(),
          campusId: pdam.id,
        }),
      ]);
    });
  });
};

app.use(volleyball);

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

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal Server Error');
});

syncAndSeed().then(() => {
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
});
