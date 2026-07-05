const { v4: uuidv4 } = require("uuid");

const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  getQuestions,
  getQuizByLesson,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getTeacherQuizzes,
} = require("../models/quizModel");

exports.createQuiz = async (req, res) => {
  try {
    const { lesson_id, title, description, time_limit, passing_score } =
      req.body;

    const quiz = await createQuiz(
      uuidv4(),
      lesson_id,
      title,
      description,
      time_limit,
      passing_score,
    );

    res.status(201).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await getAllQuizzes();

    res.json({
      success: true,
      quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await getQuizById(req.params.id);

    res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getTeacherQuizzes = async (req, res) => {
  try {
    const quizzes = await getTeacherQuizzes(req.user.id);

    res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getQuizByLesson = async (req, res) => {
  try {
    const quizzes = await getQuizByLesson(req.params.lessonId);
   
    res.json({
      success: true,
      quizzes, // <-- plural
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;

    const quiz = await updateQuiz(req.params.id, title, description);

    res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    await deleteQuiz(req.params.id);

    res.json({
      success: true,
      message: "Quiz deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { question, option_a, option_b, option_c, option_d, correct_answer } =
      req.body;

    const newQuestion = await addQuestion(
      uuidv4(),

      req.params.quizId,

      question,

      option_a,

      option_b,

      option_c,

      option_d,

      correct_answer,
    );

    res.status(201).json({
      success: true,

      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await getQuestions(req.params.quizId);

    res.json({
      success: true,

      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
exports.getQuestionById = async (req, res) => {
  try {
    const question = await getQuestionById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { question, option_a, option_b, option_c, option_d, correct_answer } =
      req.body;

    const updatedQuestion = await updateQuestion(
      req.params.id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await getQuestionById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    await deleteQuestion(req.params.id);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
