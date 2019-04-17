const { conn, Student, Campus, getGPA } = require('./db');
const faker = require('faker');

conn.sync({ force: true }).then(() => {
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
