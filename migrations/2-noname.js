'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-07-19T08:54:00.936Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Users",
        {
            "id": {
                "type": Sequelize.BIGINT,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name"
            },
            "username": {
                "type": Sequelize.STRING,
                "field": "username",
                "unique": true,
                "allowNull": false
            },
            "email": {
                "type": Sequelize.STRING,
                "field": "email",
                "unique": true,
                "allowNull": false
            },
            "password": {
                "type": Sequelize.STRING,
                "field": "password",
                "allowNull": false
            },
            "email_verified": {
                "type": Sequelize.BOOLEAN,
                "field": "email_verified",
                "defaultValue": false,
                "allowNull": false
            },
            "email_verified_at": {
                "type": Sequelize.DATE,
                "field": "email_verified_at",
                "allowNull": true
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
