'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "UserId" from table "Profiles"
 * changeColumn "user_id" on table "Profiles"
 * changeColumn "user_id" on table "Profiles"
 * changeColumn "user_id" on table "Profiles"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2023-08-04T15:27:55.875Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Profiles", "UserId"]
    },
    {
        fn: "changeColumn",
        params: [
            "Profiles",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "field": "user_id",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Profiles",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "field": "user_id",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Profiles",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "field": "user_id",
                "allowNull": false
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
