'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Wallets", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-08-16T22:35:53.034Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Wallets",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "tag": {
                "type": Sequelize.STRING,
                "field": "tag",
                "unique": true,
                "allowNull": false
            },
            "balance": {
                "type": Sequelize.FLOAT,
                "field": "balance",
                "defaultValue": 0
            },
            "currency": {
                "type": Sequelize.ENUM('NGN', 'GHS', 'USD', 'GBP'),
                "field": "currency"
            },
            "user_id": {
                "type": Sequelize.INTEGER,
                "field": "user_id",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
