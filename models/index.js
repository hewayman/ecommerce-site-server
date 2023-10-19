const { Sequelize } = require('sequelize');

const db = {};

const sequelize = new Sequelize('new-ecommerce-store', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate().then(
  () => {
    console.log('Connected to db');
  },
  (err) => {
    console.log(err);
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.listings = require('./listing')(sequelize, Sequelize);
db.reviews = require('./review')(sequelize, Sequelize);

module.exports = db;
