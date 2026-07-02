const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createLessonValidation,
  updateLessonValidation,
} = require("../validators/lessonValidator");
const { youtubeValidation } = require("../validators/videoValidator");
const validate = require("../middleware/validationMiddleware");
const { uuidValidation } = require("../validators/uuidValidator");
const {
  createLesson,
  getAllLessons,
  getLessonById,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
  uploadVideo,
  addYoutubeVideo,
} = require("../controllers/lessonController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  createLessonValidation,
  validate,
  createLesson,
);

router.post(
  "/:id/upload-video",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  validate,
  upload.single("video"),
  uploadVideo
);

router.put(
  "/:id/youtube",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  youtubeValidation,
  validate,
  addYoutubeVideo,
);

router.get("/", getAllLessons);

router.get(
  "/course/:courseId",
  uuidValidation("courseId"),
  validate,
  getLessonsByCourse
);

router.get("/:id",uuidValidation(),
  validate, getLessonById);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  updateLessonValidation,
  validate,
  updateLesson,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  uuidValidation(),
  validate,
  deleteLesson
);

module.exports = router;
