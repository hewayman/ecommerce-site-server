require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const database = require('./models/index');
const userController = require('./controllers/user_controller');
const reviewController = require('./controllers/review_controller');
const listingController = require('./controllers/listing_controller');

database.sequelize.sync();

app.use(express.json());
// database.sequelize.sync({ force: true });

app.use('/user', userController);
app.use('/review', reviewController);
app.use('/listing', listingController);

app.use(require('./middleware/validate_session'));

app.listen(port, () => console.log(`App is listening on port ${port}`));
