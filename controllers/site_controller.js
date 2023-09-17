const express = require('express');
const router = express.Router();

router.get('/practice', (req, res) => {
  res.send('another test route');
});

module.exports = router;
