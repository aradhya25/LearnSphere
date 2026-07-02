const { v4: uuidv4 } = require("uuid");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getMyCourses,
} = require("../models/courseModel");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, language } = req.body;

    // Get uploaded image path
    const thumbnail = req.file ? `/uploads/images/${req.file.filename}` : null;

    const course = await createCourse(
      uuidv4(),
      title,
      description,
      language,
      thumbnail,
      req.user.id,
    );

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCourses();

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await getMyCourses(req.user.id);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, language } = req.body;

    const thumbnail = req.file
      ? `/uploads/images/${req.file.filename}`
      : undefined;

    const course = await updateCourse(
      req.params.id,
      title,
      description,
      language,
      thumbnail,
    );

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await deleteCourse(req.params.id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
