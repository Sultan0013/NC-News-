const { Pool } = require('pg');

let ENV = process.env.NODE_ENV || 'development';

console.log(ENV);
require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE not set');
}
const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}
const db = new Pool(config);
module.exports = db;
