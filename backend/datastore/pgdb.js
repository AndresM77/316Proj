const pg = require('pg');
const credentials = require('./credentials')

//create a congif to configure both pooling behavior and client options
//note: all config is optional and the environment variables will be read if the config is not present
var config = {
    user: credentials.username,  //env var: PGUSER
    database: credentials.database,  //env var: PGDATABASE
    password: credentials.password,  //env var: PGPASSWARD
    host: credentials.server,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000,
};

//this initialized a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

module.exports.pool = pool;

//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
};

//the pool also supports checking out a client for 
//multiple operations, such as a transaction
module.exports.connect = function (callback) {
    return pool.connect(callback);
};