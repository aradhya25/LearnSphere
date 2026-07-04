import api from "./api";

export const getTeacherAttempts = () => {
  return api.get("/attempts/teacher-attempts");
};