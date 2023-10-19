require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const database = require('./models/index');
const user = require('./controllers/user_controller');

database.sequelize.sync();

app.use(express.json());
// database.sequelize.sync({ force: true });

// const site = require('./controllers/site_controller');

app.use('/user', user);
app.use(require('./middleware/validate-session'));

app.listen(port, () => console.log(`App is listening on port ${port}`));
