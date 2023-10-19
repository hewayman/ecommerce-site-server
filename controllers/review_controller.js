const router = require('express').Router();
const sequelize = require('../models');
const Review = sequelize.reviews;
const validateSession = require('../middleware/validate_session');

router.get('/', (req, res) => {
  Review.findAll()
    .then((item) => res.status(200).json({ item }))
    .catch((err) => res.status(500).json({ error: 'Cannot find reviews.' }));
});

router.post('/create', validateSession, (req, res) => {
  const reviewData = {
    rating: req.body.rating,
    reviewDetails: req.body.reviewDetails,
    date: req.body.date,
    userId: req.user.id,
    userFirstName: req.user.firstName,
    userLastName: req.user.lastName,
    itemId: req.body.itemId,
  };

  Review.create(reviewData)
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: 'Review not created' }));
});

router.put('/:id', validateSession, (req, res) => {
  Review.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: 'Update not successful' }));
});

router.delete('/:id', validateSession, async (req, res) => {
  try {
    const result = await Review.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Review not deleted' });
  }
});

router.get('/item/:storeitemId', (req, res) => {
  Review.findAll({
    where: {
      storeitemId: req.params.storeitemId,
    },
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: 'Reviews not found' }));
});

module.exports = router;
