const mySQL = require('mysql');

const chpConnection = mySQL.createConnection({
    debug: false,
    host: '127.0.0.1',
    port: '3306',
    user: 'sortega_cs355sp20',
    password: 'or5286689',
    database: 'sortega_cs355sp20'
});

module.exports = chpConnection;
