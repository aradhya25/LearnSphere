import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import EditCourseHeader from "../../../components/TeacherCourses/EditCourseHeader";
import EditCourseForm from "../../../components/TeacherCourses/EditCourseForm";
import CoursePreviewCard from "../../../components/TeacherCourses/CoursePreviewCard";
import EditCourseSkeleton from "../../../components/TeacherCourses/EditCourseSkeleton";
import EditCourseError from "../../../components/TeacherCourses/EditCourseError";
import {
  getCourseById,
  updateCourse,
} from "../../../services/teacherCourseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EditCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Loading statuses
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");

  // Thumbnail states
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // Submitting statuses
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // 1. Initial Load: Fetch Course Details
  const fetchCourseData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCourseById(id);
      if (response.data && response.data.success) {
        const course = response.data.course;
        setTitle(course.title || "");
        setDescription(course.description || "");
        setLanguage(course.language || "");
        setCurrentThumbnail(course.thumbnail || "");
      } else {
        throw new Error("API server returned unsuccessful status.");
      }
    } catch (err) {
      console.error("Error fetching course details from backend API.", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchCourseData();
    }
  }, [id]);
  useEffect(() => {
    setErrors({});
  }, [title, description, language, thumbnailFile]);
  useEffect(() => {
    if (!thumbnailFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(thumbnailFile);

    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [thumbnailFile]);
  // 2. Validate Form fields
  const validate = () => {
    const tempErrors = {};
    if (!title.trim()) {
      tempErrors.title = "Course title is required.";
    } else if (title.length > 100) {
      tempErrors.title = "Title must be 100 characters or less.";
    }
    if (!description.trim()) {
      tempErrors.description = "Course description is required.";
    } else if (description.length > 1000) {
      tempErrors.description = "Description must be 1000 characters or less.";
    }
    if (!language) {
      tempErrors.language = "Course language is required.";
    }
    if (thumbnailFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!allowedTypes.includes(thumbnailFile.type)) {
        tempErrors.thumbnail =
          "Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.";
      } else if (thumbnailFile.size > maxSize) {
        tempErrors.thumbnail = "File size exceeds the maximum 5 MB limit.";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  // 3. Save Changes Form handler
  const handleFormSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // Construct FormData payload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("language", language);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      // PUT /api/courses/:id
      const response = await updateCourse(id, formData);
      if (response.data && response.data.success) {
        toast.success("Course updated successfully.");
        // Redirect after 1 second
        setTimeout(() => {
          navigate("/teacher/courses");
        }, 1000);
      } else {
        throw new Error(response.data.message || "Unable to update course.");
      }
    } catch (err) {
      console.error("Course update failed on backend API.", err);

      const backendMsg =
        err.response?.data?.message ||
        err.message ||
        "Unable to update course.";
      toast.error(backendMsg);

      // Inline field mapping if backend returns detailed schema errors
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFormCancel = () => {
    navigate("/teacher/courses");
  };
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        {/* Toast Notification Container */}
        {/* <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
        {/* Loading Skeletons */}
        {isLoading && <EditCourseSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && <EditCourseError onRetry={fetchCourseData} />}
        {/* Form content loaded view */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header toolbar */}
            <EditCourseHeader loading={loading} onSubmit={handleFormSubmit} />
            {/* Split layout: Form (65%) & Preview Card (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input panel */}
              <div className="lg:col-span-8 w-full">
                <EditCourseForm
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  language={language}
                  setLanguage={setLanguage}
                  thumbnailFile={thumbnailFile}
                  setThumbnailFile={setThumbnailFile}
                  currentThumbnail={currentThumbnail}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                  errors={errors}
                  loading={loading}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
              {/* Real-time preview card */}
              <div className="lg:col-span-4 w-full">
                <CoursePreviewCard
                  title={title}
                  description={description}
                  language={language}
                  thumbnail={previewUrl || currentThumbnail}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
