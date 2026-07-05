import api from "./api";

// Generate AI Quiz
export const generateQuiz = (data) => {
  return api.post("/ai/generate-quiz", data);
};
export const getTeacherQuizzes = () => {
  return api.get("/quizzes/my-quizzes");
};
// Get all quizzes (for dropdown)
export const getAllQuizzes = () => {
  return api.get("/quizzes");
};

// Get quizzes of a lesson (optional)
export const getQuizzesByLesson = (lessonId) => {
  return api.get(`/quizzes/lesson/${lessonId}`);
};

// Get quiz details (optional)
export const getQuizById = (quizId) => {
  return api.get(`/quizzes/${quizId}`);
};
export const generateLessonSummary = (lessonContent) => {
  return api.post("/ai/generate-summary", {
    lessonContent,
  });
};
export const explainAnswer = (payload) => {
  return api.post("/ai/explain-answer", payload);
};