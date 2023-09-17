const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('new-ecommerce-store', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// const testDbConnection = async () => {
//   try {
//     await database.authenticate();
//     console.log("Connected to database");
//   } catch (error) {
//     console.error("Unable to connect to database", error);
//   }
// };
sequelize.authenticate().then(
  () => {
    console.log('Connected to db');
  },
  (err) => {
    console.log(err);
  }
);

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.users = require('./user')(sequelize, Sequelize);

// module.exports = { database, testDbConnection };

module.exports = database;
