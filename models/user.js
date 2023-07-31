const  {Sequelize} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', 
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_verified:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },{
        paranoid: true
    });

    User.isEmailTaken = async function (email) {
        const user = await User.findOne({
            where: {email: email.toString().toLowerCase()},
            paranoid: false
        });
        return !!user;
    }

    User.isUsernameTaken = async function (username) {
        const user = await User.findOne({
            where: {username}
        });
        return !!user;
    };

    User.prototype.isPasswordMatch = async function (password) {
        const user = this;
        return bcrypt.compare(password, user.password);
    };

    User.prototype.toJSON = function () {
        const values = {...this.get()};
        delete values.password;
        return values;
    };

    return User;
}