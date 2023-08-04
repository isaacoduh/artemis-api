'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Accounts", deps: []
 * createTable "SecurityQuestions", deps: []
 * createTable "Tasks", deps: []
 * createTable "Users", deps: []
 * createTable "UserSecurityQuestions", deps: [SecurityQuestions, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-08-04T14:52:41.905Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Accounts",
            {
                "id": {
                    "type": Sequelize.BIGINT,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "allowNull": false
                },
                "currency": {
                    "type": Sequelize.STRING,
                    "field": "currency",
                    "allowNull": false
                },
                "balance": {
                    "type": Sequelize.FLOAT,
                    "field": "balance",
                    "default": 0
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active",
                    "default": true
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
    },
    {
        fn: "createTable",
        params: [
            "SecurityQuestions",
            {
                "id": {
                    "type": Sequelize.BIGINT,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "question": {
                    "type": Sequelize.STRING,
                    "field": "question",
                    "unqiue": true,
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
    },
    {
        fn: "createTable",
        params: [
            "Tasks",
            {
                "id": {
                    "type": Sequelize.BIGINT,
                    "field": "id",
                    "primaryKey": true,
                    "unique": true,
                    "autoIncrement": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
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
    },
    {
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
    },
    {
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
    }
];

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
