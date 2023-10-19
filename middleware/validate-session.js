const jwt = require('jsonwebtoken');
const sequelize = require('../models');
const User = sequelize.users;

const validateSession = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodeToken) => {
    if (!error && decodeToken) {
      User.findOne({
        where: {
          id: decodeToken.id,
        },
      })
        .then((user) => {
          if (!user) throw error;

          req.user = user;
          return next();
        })
        .catch((error) => next(error));
    }

    req.errors = error;
    return res.status(500).send('Not authorized');
  });
};

module.exports = validateSession;
