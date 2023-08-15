'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "SavingsPlans", deps: []
 *
 **/

var info = {
    "revision": 7,
    "name": "noname",
    "created": "2023-08-15T12:02:29.271Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "SavingsPlans",
        {
            "id": {
                "type": Sequelize.BIGINT,
                "field": "id",
                "primaryKey": true,
                "autoIncrement": true
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name",
                "allowNull": false
            },
            "startingAmount": {
                "type": Sequelize.FLOAT,
                "field": "startingAmount"
            },
            "frequency": {
                "type": Sequelize.ENUM('daily', 'weekly', 'bi-weekly', 'monthly'),
                "field": "frequency",
                "defaultValue": "monthly"
            },
            "savingMethod": {
                "type": Sequelize.ENUM('manual', 'automatic'),
                "field": "savingMethod",
                "defaultValue": "manual"
            },
            "planLength": {
                "type": Sequelize.INTEGER,
                "field": "planLength"
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
