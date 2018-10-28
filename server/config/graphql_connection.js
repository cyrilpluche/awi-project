const pgPromise = require('pg-promise');
const pgp = pgPromise({}); // empty pgPromise instance
const psql = pgp(process.env.DB_URI); // get connection to your db instance

exports.psql = psql;

