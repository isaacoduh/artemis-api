'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "UserSecurityQuestions", deps: [SecurityQuestions, Users]
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2023-08-02T12:15:25.122Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "UserSecurityQuestions",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "answer": {
                "type": Sequelize.STRING,
                "field": "answer",
                "allowNull": false
            },
            "questionId": {
                "type": Sequelize.BIGINT,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "SecurityQuestions",
                    "key": "id"
                },
                "allowNull": true,
                "field": "questionId"
            },
            "userId": {
                "type": Sequelize.BIGINT,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true,
                "field": "userId"
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
