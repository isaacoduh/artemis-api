'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "type" to table "AccountHistories"
 * addColumn "amount" to table "AccountHistories"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2023-08-14T11:48:54.225Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "AccountHistories",
            "type",
            {
                "type": Sequelize.STRING,
                "field": "type"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "AccountHistories",
            "amount",
            {
                "type": Sequelize.FLOAT,
                "field": "amount"
            }
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
