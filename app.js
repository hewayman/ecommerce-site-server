require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

const database = require('./models/index');
const userController = require('./controllers/user_controller');
const reviewController = require('./controllers/review_controller');
const listingController = require('./controllers/listing_controller');

database.sequelize.sync();
// database.sequelize.sync({ force: true });

app.use(express.json());
app.use(cors({ origin: true }));

app.use('/user', userController);
app.use('/review', reviewController);
app.use('/listing', listingController);

app.use(require('./middleware/validate_session'));

app.listen(port, () => console.log(`App is listening on port ${port}`));
