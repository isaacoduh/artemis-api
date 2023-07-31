const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};
const pin = (value, helpers) => {
  if (value.length < 4 || value.length > 4) {
    return helpers.message("PIN must be 4 characters");
  }
  // if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
  //   return helpers.message('password must contain at least 1 letter and 1 number');
  // }
  return value;
};

module.exports = {
  password,
  pin,
};
