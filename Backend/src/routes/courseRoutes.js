const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validationMiddleware");
const { uuidValidation } = require("../validators/uuidValidator");
const {
  createCourseValidation,
  updateCourseValidation,
} = require("../validators/courseValidator");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getMyCourses,
} = require("../controllers/courseController");
const uploadImage = require("../middleware/imageUploadMiddleware");
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  uploadImage.single("thumbnail"),
  createCourseValidation,
  validate,
  createCourse,
);
router.get(
  "/my-courses",
  authMiddleware,
  roleMiddleware("teacher"),
  getMyCourses,
);
router.get("/", getAllCourses);

router.get("/:id", getCourseById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  uploadImage.single("thumbnail"),
  uuidValidation(),
  updateCourseValidation,
  validate,
  updateCourse,
);

router.delete("/:id", authMiddleware, roleMiddleware("teacher"), deleteCourse);

module.exports = router;
