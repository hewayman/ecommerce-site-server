const { DataTypes } = require('sequelize');

module.exports = (db) => {
  return db.define('review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userLastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
