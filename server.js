const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const PORT = 5100;

const server = app.listen(PORT, () => {
  //logger information
  logger.info(`Listening to port ${PORT}`);
  // console.log(`Listening to port ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server Closed!");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM recieved!");
  if (server) {
    server.close();
  }
});
// exit handler
// unexpected errorhandler
