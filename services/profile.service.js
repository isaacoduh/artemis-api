const {
  User,
  SecurityQuestion,
  UserSecurityQuestion,
  sequelize,
} = require("../models");
const { abortIf } = require("../utils/request/ApiResponder");
const createSecurityQuestion = async (payload) => {
  const { user_id, question_id, answer } = payload;
  try {
    const user = await User.findByPk(user_id);
    abortIf(!user, 404, "User not found!");

    const question = await SecurityQuestion.findOne({
      where: { id: question_id },
    });
    abortIf(!question, 404, "Question not found!");

    const result = await UserSecurityQuestion.create({
      userId: user.id,
      questionId: question.id,
      answer,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const bulkSaveSecurityQuestions = async (payload, userId) => {
  try {
    const promises = [];
    for (let i = 0; i < payload.length; i++) {
      const p = await UserSecurityQuestion.create({
        userId: userId,
        questionId: payload[i].question_id,
        answer: payload[i].answer,
      });
      promises.push(p);
    }
    await Promise.all(promises);
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createSecurityQuestion, bulkSaveSecurityQuestions };
