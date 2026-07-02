import api from "./api";
export const getMyCourses = () => {
  return api.get("/courses/my-courses");
};

export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};

export const createCourse = (formData) => {
  return api.post("/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCourse = (id, formData) => {
  return api.put(`/courses/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};