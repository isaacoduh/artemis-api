const { BAD_REQUEST, NOT_FOUND } = require("http-status");
const { User, Wallet, sequelize } = require("../models");
const { abortIf } = require("../utils/request/ApiResponder");
const createWallet = async (payload) => {
  try {
    const { user_id, currency } = payload;
    const user = await User.findOne({ where: { id: user_id } });

    abortIf(!user, NOT_FOUND, "User not found!");

    const existingWallet = await Wallet.findOne({
      where: { user_id: user.id, currency },
    });

    abortIf(
      existingWallet,
      BAD_REQUEST,
      "Wallet for this currency already exists!"
    );

    const tag = `${user.username}_${currency}_wallet`;
    const wallet = await Wallet.create({ tag, currency, user_id: user.id });
    return { wallet };
  } catch (error) {
    console.log(error);
  }
};

const getWalletByTag = async (tag) => {
  try {
    let wallet = null;
    let user = null;
    if (tag.includes("@")) {
      const tag = tag.split("@")[1];
      const wallet = await Wallet.findOne({ where: { tag: tag } });
      const user = await User.findOne({ where: { id: wallet.user_id } });
      return { wallet, user };
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllWallets = async (id) => {
  try {
    const wallets = await Wallet.findAll({ where: { user_id: id } });
    return { wallets };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createWallet, getWalletByTag, getAllWallets };
