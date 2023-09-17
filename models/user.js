const { DataTypes } = require('sequelize');

module.exports = (db) => {
  const User = db.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
