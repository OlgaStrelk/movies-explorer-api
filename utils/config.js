require('dotenv').config();
const { DEFAULT_DB_PATH, DEFAULT_PORT } = require('./consts');

const { PORT = DEFAULT_PORT, DB_PATH = DEFAULT_DB_PATH } = process.env;

module.exports = {
  PORT,
  DB_PATH,
};
