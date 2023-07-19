const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../.env')});

const config = {
    development: {
        username: "isaacoduh",
        password: "root",
        database: "artemis-dev",
        host: "127.0.0.1",
        dialect: "postgres"
    }
};

module.exports = config;