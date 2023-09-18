const { SecurityQuestion, User, Account } = require("../models");

const createSecurityQuestion = async (payload) => {
  const question = await SecurityQuestion.create(payload);
  return question;
};

const getAllSecurityQuestions = async () => {
  const questions = await SecurityQuestion.findAll();
  return questions;
};

const bulkCreateSecurityQuestions = async (questions) => {
  try {
    const promises = [];
    for (let i = 0; i < questions.length; i++) {
      const p = await SecurityQuestion.create(questions[i]);
      promises.push(p);
    }
    await Promise.all(promises);
    return;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  const users = await User.findAll({ include: Account });
  return users;
};

module.exports = {
  createSecurityQuestion,
  getAllSecurityQuestions,
  bulkCreateSecurityQuestions,
  getAllUsers,
};
