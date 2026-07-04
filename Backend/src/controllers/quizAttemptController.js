const { v4: uuidv4 } = require("uuid");

const {
  createAttempt,
  getAttemptsByUser,
   getAllAttempts,
} = require("../models/quizAttemptModel");
const {
  getQuestions,
} = require("../models/quizModel");

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quizId = req.params.quizId;

    // Fetch all questions for this quiz
    const questions = await getQuestions(quizId);

    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: "Quiz questions not found",
      });
    }

    let score = 0;

    // Compare answers
    questions.forEach((question) => {
      const submitted = answers.find(
        (a) => a.question_id === question.id
      );

      if (
        submitted &&
        submitted.selected_answer === question.correct_answer
      ) {
        score++;
      }
    });

    const total_questions = questions.length;

    const attempt = await createAttempt(
      uuidv4(),
      req.user.id,
      quizId,
      score,
      total_questions
    );

    res.status(201).json({
      success: true,
      score,
      total_questions,
      attempt,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMyAttempts = async (req, res) => {
  try {

    const attempts = await getAttemptsByUser(req.user.id);

    res.status(200).json({
      success: true,
      attempts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.getAllAttempts = async (req, res) => {
  try {
    const attempts = await getAllAttempts(req.user.id);

    res.status(200).json({
      success: true,
      attempts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};