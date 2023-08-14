'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "AccountHistories", deps: []
 *
 **/

var info = {
    "revision": 5,
    "name": "noname",
    "created": "2023-08-14T11:46:02.556Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "AccountHistories",
        {
            "id": {
                "type": Sequelize.BIGINT,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "account_id": {
                "type": Sequelize.INTEGER,
                "field": "account_id",
                "allowNull": false
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
            },
            "deletedAt": {
                "type": Sequelize.DATE,
                "field": "deletedAt"
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
