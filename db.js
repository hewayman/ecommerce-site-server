const { Sequelize } = require('sequelize');

const database = new Sequelize('new-ecommerce-store', 'postgres', 'password', {
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
database.authenticate().then(
  () => {
    console.log('Connected to db');
  },
  (err) => {
    console.log(err);
  }
);

// module.exports = { database, testDbConnection };

module.exports = database;
