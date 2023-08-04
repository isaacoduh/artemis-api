'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Profiles", deps: [Users]
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2023-08-04T15:27:13.854Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Profiles",
        {
            "id": {
                "type": Sequelize.BIGINT,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "gender": {
                "type": Sequelize.STRING,
                "field": "gender"
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
            },
            "UserId": {
                "type": Sequelize.BIGINT,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
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
