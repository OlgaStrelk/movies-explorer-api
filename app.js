require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const { errors } = require('celebrate');
// const cors = require('./middlewares/cors');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandler');

const app = express();
// app.use(cors);

const { PORT = 3002 } = process.env;
mongoose.connect(process.env.DB_PATH);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connection with db is set'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(requestLogger);

app.use('/', require('./routes/index'));

// app.use(errorLogger);
// app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
