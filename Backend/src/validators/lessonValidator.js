const { body } = require("express-validator");

exports.createLessonValidation = [
  body("course_id")
    .notEmpty()
    .withMessage("Course ID required"),

  body("title")
    .notEmpty()
    .withMessage("Lesson title required"),

  body("content")
    .notEmpty()
    .withMessage("Content required"),

  body("order_no")
    .isInt({ min: 1 })
    .withMessage("Order number must be positive"),
];

exports.updateLessonValidation = [
  body("title")
    .notEmpty()
    .withMessage("Lesson title required"),

  body("content")
    .notEmpty()
    .withMessage("Content required"),

  body("order_no")
    .isInt({ min: 1 })
    .withMessage("Order number must be positive"),
];