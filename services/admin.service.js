const { SecurityQuestion } = require("../models");

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

module.exports = {
  createSecurityQuestion,
  getAllSecurityQuestions,
  bulkCreateSecurityQuestions,
};
