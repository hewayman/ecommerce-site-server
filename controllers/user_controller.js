const router = require('express').Router();
const sequelize = require('../models');
const User = sequelize.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password),
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

router.post('/login', async (req, res) => {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(500).json({ error: 'User does not exist' });
      }

      bcrypt.compare(
        req.body.user.password,
        user.password,
        (error, isMatch) => {
          if (error || !isMatch) {
            return res.status(502).json({ error: 'Login failed' });
          }

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });

          return res.status(200).json({
            user,
            message: 'User login successful',
            sessionToken: token,
          });
        }
      );
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
