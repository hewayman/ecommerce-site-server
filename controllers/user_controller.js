const router = require('express').Router();
const sequelize = require('../models');
const User = sequelize.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  const userData = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    role: 'user',
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  User.create(userData)
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
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(500).json({ error: 'User does not exist' });
      }

      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
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
      });
    })
    .catch((error) => res.status(500).json({ error }));
});

router.post('/admin', (req, res) => {
  User.create({
    email: process.env.ADMIN_EMAIL,
    password: bcrypt.hashSync(process.env.ADMIN_PASS, 12),
    role: 'admin',
  })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.status(200).json({
        user: user,
        message: 'Admin created successfully',
        sessionToken: token,
      });
    })
    .catch((err) =>
      res.status(500).json({ error: 'Admin account not created' })
    );
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ error: 'Cannot display users' }));
});

module.exports = router;
