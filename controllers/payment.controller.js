const catchAsync = require("../utils/request/catchAsync");
const https = require("https");
const axios = require("axios");
const request = require("request");
const { ApiResponder } = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");
const { User, Account, AccountHistory, sequelize } = require("../models");
require("dotenv").config();

const acceptPayment = catchAsync(async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findOne({ where: { id: req.user.id } });
    const paymentData = {
      email: user.dataValues.email,
      amount: amount * 100,
      reference: `payment_${Date.now()}`,
      callback_url: "http://localhost:5100/api/v1/account/payment/callback",
    };

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_API_SECRET}`,
        },
      }
    );
    return ApiResponder(res, httpStatus.OK, "Success", response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occured!" });
  }
});

const verifyPayment = catchAsync(async (req, res) => {
  try {
    const { reference } = req.query;
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_API_SECRET}`,
        },
      }
    );
    const transaction = verifyResponse.data.data;
    if (transaction.status === "success") {
      const user = await User.findOne({
        where: { email: transaction.customer.email },
      });
      if (user) {
        const account = await Account.findOne({ where: { user_id: user.id } });
        await account.update({
          balance: account.balance + transaction.amount / 100,
        });
        await AccountHistory.create({
          account_id: account.id,
          user_id: user.id,
          amount: transaction.amount / 100,
          type: "CREDIT",
        });
      }
      return res.status(200).send("Payment Callback Recieved: Account Funded!");
    }
  } catch (error) {}
});

module.exports = { acceptPayment, verifyPayment };
