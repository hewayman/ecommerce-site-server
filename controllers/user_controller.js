const router = require('express').Router();
const sequelize = require('../models');
// const User = require('../db').import('../models/user');
const User = sequelize.users;
// const { database } = require('../db');
// const User = require('../models/user');

router.post('/create', (req, res) => {
  User.create({
    email: req.body.user.email,
    password: req.body.user.password,
  }).then(res.send('This is our /user/create endpoint'));
});

module.exports = router;
