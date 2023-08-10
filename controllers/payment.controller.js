const catchAsync = require("../utils/request/catchAsync");
const https = require("https");
const axios = require("axios");
const request = require("request");
const { ApiResponder } = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");
const PAYSTACK_API_KEY = "sk_test_36f20209757f2c67c957f336c9a2f31df37549da";

require("dotenv").config();
const verifyPayment = catchAsync(async (req, res) => {
  try {
    const { reference } = req.query;
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
        },
      }
    );
    const transaction = verifyResponse.data.data;
    if (transaction.status === "success") {
      return res.status(200).send("Payment Callback Recieved");
    }
  } catch (error) {}
});
const acceptPayment = catchAsync(async (req, res) => {
  try {
    const { email, amount } = req.body;
    const paymentData = {
      email,
      amount: amount * 100,
      reference: `payment_${Date.now()}`,
      callback_url: "http://localhost:5100/api/v1/account/payment/callback",
    };

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
        },
      }
    );
    return ApiResponder(res, httpStatus.OK, "Success", response.data.data);

    // return res.send(response);

    // const params = JSON.stringify({ email: email, amount: amount * 100 });

    // const options = {
    //   hostname: "api.paystack.co",
    //   port: 443,
    //   path: "/transaction/initialize",
    //   method: "POST",
    //   headers: {
    //     Authorization:
    //       "Bearer sk_test_36f20209757f2c67c957f336c9a2f31df37549da",
    //     "Content-Type": "application/json",
    //   },
    // };

    // const clientReq = https
    //   .request(options, (apiResponse) => {
    //     let data = "";
    //     apiResponse.on("data", (chunk) => {
    //       data += chunk;
    //     });
    //     apiResponse.on("end", () => {
    //       console.log(JSON.parse(data));
    //       return res.status(200).json(data);
    //     });
    //   })
    //   .on("error", (error) => {
    //     console.error(error);
    //   });
    // clientReq.write(params);
    // clientReq.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occured!" });
  }
});

module.exports = { acceptPayment, verifyPayment };
