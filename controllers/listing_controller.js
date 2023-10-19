const router = require('express').Router();
const validateSession = require('../middleware/validate_session');

router.get('/practice', validateSession, (req, res) => {
  res.send('Practice listing route');
});

module.exports = router;
