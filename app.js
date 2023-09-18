require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const profileRoutes = require("./routes/profile.routes");
const accountRoutes = require("./routes/account.routes");
const savingsRoutes = require("./routes/savings.routes");
const walletRoutes = require("./routes/wallet.routes");
const transferRoutes = require("./routes/transfer.routes");
const ApiError = require("./utils/request/ApiError");
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middleware/error");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(xss()); // sanitize request data

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, X-Requested-With, Content-Type"
  );

  next();
});

app.use("/api/v1/auth", authRoutes); // authentication routes;
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/savings", savingsRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/transfers", transferRoutes);

// catch 404
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found!"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
