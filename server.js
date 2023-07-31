const app = require("./app");
const config = require("./config/config");
const PORT = 5100;

const server = app.listen(PORT, () => {
  //logger information
  console.log(`Listening to port ${PORT}`);
});

// exit handler
// unexpected errorhandler
