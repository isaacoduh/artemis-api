const momemt = require('moment');
const jwt = require('jsonwebtoken');

const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
};


const generateToken = (data, expires, type, secret = process.env.JWT_SECRET) => {
    const payload = {
        sub: data,
        iat: momemt().unix(),
        exp: expires.unix(),
        type
    };

    return jwt.sign(payload, secret);
};

const generateAuthTokens = async (data, roles = {}) => {
    const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION,'minutes');
    const accessToken = generateToken({...data, roles}, accessTokenExpires, tokenTypes.ACCESS);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        }
    }
}
module.exports = {generateToken, generateAuthTokens};