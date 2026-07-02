import api from "./api";

// Get all lessons of a course
export const getLessons = (courseId) => {
  return api.get(`/lessons/course/${courseId}`);
};

// Get single lesson
export const getLessonById = (lessonId) => {
  return api.get(`/lessons/${lessonId}`);
};

// Get course details (used in Manage Lessons page)
export const getCourseById = (courseId) => {
  return api.get(`/courses/${courseId}`);
};

// Create lesson
export const createLesson = (data) => {
  return api.post("/lessons", data);
};

// Update lesson
export const updateLesson = (lessonId, lessonData) => {
  return api.put(`/lessons/${lessonId}`, lessonData);
};

// Delete lesson
export const deleteLesson = (lessonId) => {
  return api.delete(`/lessons/${lessonId}`);
};

// Upload lesson video
export const uploadLessonVideo = (
  lessonId,
  formData,
  onUploadProgress
) => {
  return api.post(
    `/lessons/${lessonId}/upload-video`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }
  );
};

// Add YouTube video
export const addYoutubeVideo = (lessonId, youtubeUrl) => {
  return api.put(`/lessons/${lessonId}/youtube`, {
    videoUrl: youtubeUrl,
  });
};