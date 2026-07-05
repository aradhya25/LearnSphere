const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { uuidValidation } = require("../validators/uuidValidator");
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
} = require("../controllers/quizController");
const {
  quizValidation,
  questionValidation,
} = require("../validators/quizValidator");
const validate = require("../middleware/validationMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  quizValidation,
  validate,
  createQuiz,
);

router.get("/", getAllQuizzes);
router.get(
  "/my-quizzes",
  authMiddleware,
  roleMiddleware("teacher"),
  getTeacherQuizzes,
);
router.get(
  "/lesson/:lessonId",
  uuidValidation("lessonId"),
  validate,
  getQuizByLesson,
);
router.get("/:id", getQuizById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  quizValidation,
  validate,
  updateQuiz,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  validate,
  deleteQuiz,
);

router.post(
  "/:quizId/questions",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation("quizId"),
  questionValidation,
  validate,
  addQuestion,
);

router.get(
  "/:quizId/questions",
  uuidValidation("quizId"),
  validate,
  getQuestions,
);
router.delete(
  "/questions/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  validate,
  deleteQuestion,
);
router.get("/questions/:id", uuidValidation(), validate, getQuestionById);

router.put(
  "/questions/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  questionValidation,
  validate,
  updateQuestion,
);

module.exports = router;
