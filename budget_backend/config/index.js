require('dotenv').config();

const { Pool } = require('pg');
// const isProduction = process.env.NODE_ENV === 'production';

// const connectionString = `postgresql://${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const db = new Pool({
//     connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//     ssl: isProduction,
// });

const db = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'envelope_budget_ii',
    user: 'me',
    password: 'passw0rd',
});

module.exports = { db };