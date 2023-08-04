'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "active" from table "Accounts"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-08-04T14:55:38.309Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["Accounts", "active"]
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
