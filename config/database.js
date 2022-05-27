const mysql =require('mysql');
const util =require('util');
const {host, user, password, database} = require('../config/config');

const pool = mysql.createPool({
    connectionLimit:10,
    host,
    user,
    password,
    database
})

pool.query = util.promisify(pool.query);
module.exports = pool;