const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  submitQuiz,
  getMyAttempts,
  getAllAttempts,
} = require("../controllers/quizAttemptController");

router.post("/:quizId/submit", authMiddleware, submitQuiz);

router.get("/my-attempts", authMiddleware, getMyAttempts);
router.get(
  "/teacher-attempts",
  authMiddleware,
  roleMiddleware("teacher"),
  getAllAttempts,
);

module.exports = router;
