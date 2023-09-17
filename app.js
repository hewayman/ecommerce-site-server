const express = require('express');
const app = express();
const port = 3000;
const database = require('./models/index');

database.sequelize.sync();

// database.sequelize.sync({ force: true });

const site = require('./controllers/site_controller');
const user = require('./controllers/user_controller');

app.use(express.json());

app.use('/site', site);
app.use('/user', user);

app.listen(port, () => console.log(`App is listening on port ${port}`));
