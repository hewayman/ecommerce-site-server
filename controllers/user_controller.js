const router = require('express').Router();
const sequelize = require('../models');
// const User = require('../db').import('../models/user');
const User = sequelize.users;
const jwt = require('jsonwebtoken');
// const { database } = require('../db');
// const User = require('../models/user');

// const handleLoginSuccess = (user) => {
//   console.log('here');
//   if (user === null || user === 'undefined') {
//     res.status(500).json({ error: 'User does not exist' });
//   }

//   res.status(200).json({ user });
// };

router.post('/register', (req, res) => {
  User.create({
    email: req.body.user.email,
    password: req.body.user.password,
    isAdmin: req.body.user.isAdmin,
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
  })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.json({
        user,
        message: 'User successfully created',
        sessionToken: token,
      });
    })
    .catch((error) => res.status(500).json({ error }));
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        res.status(200).json({
          user,
          message: 'User login successful',
          sessionToken: token,
        });
      } else {
        res.status(500).json({ error: 'User does not exist' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
