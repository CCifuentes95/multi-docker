const keys = require('./keys');
const { Pool } = require('pg');

const pgClient = new Pool({
    host: keys.pgHost,
    database: keys.pgDatabase,
    user: keys.pgUser,
    password: keys.pgPassword,
    port: keys.pgPort
});


pgClient.on('connect', () => {
    pgClient
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.dir(err));
});

module.exports = { pgClient };
