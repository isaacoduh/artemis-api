const { SecurityQuestion } = require("../models");

const createSecurityQuestion = async (payload) => {
  const question = await SecurityQuestion.create(payload);
  return question;
};

const getAllSecurityQuestions = async () => {
  const questions = await SecurityQuestion.findAll();
  return questions;
};

module.exports = { createSecurityQuestion, getAllSecurityQuestions };
