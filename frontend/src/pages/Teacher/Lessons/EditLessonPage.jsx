import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import EditLessonHeader from "../../../components/TeacherLessons/EditLessonHeader";
import EditLessonForm from "../../../components/TeacherLessons/EditLessonForm";
import LessonPreviewCard from "../../../components/TeacherLessons/LessonPreviewCard";
import EditLessonSkeleton from "../../../components/TeacherLessons/EditLessonsSkeleton";
import EditLessonError from "../../../components/TeacherLessons/EditLessonError";
import {
  getLessonById,
  getCourseById,
  updateLesson,
  uploadLessonVideo,
  addYoutubeVideo,
} from "../../../services/teacherLessonApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EditLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  // Loaders
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Parent Course states
  const [courseId, setCourseId] = useState(null);
  const [courseTitle, setCourseTitle] = useState("Course Syllabus");
  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [videoType, setVideoType] = useState("upload"); // 'upload' | 'youtube'
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  // Submit statuses
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  // 1. Initial Load: Fetch Lesson & Course details
  const fetchLessonData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const lessonRes = await getLessonById(lessonId);
      if (lessonRes.data && lessonRes.data.success) {
        const lesson = lessonRes.data.lesson;
        setTitle(lesson.title || "");
        setContent(lesson.content || "");
        setOrderNo(lesson.order_no || "");

        const type = lesson.video_type || "upload";
        setVideoType(type === "video" ? "upload" : type);

        if (type === "youtube") {
          setYoutubeUrl(lesson.video_url || "");
        }
        const parentId = lesson.course_id;
        setCourseId(parentId);
        // Fetch parent course title details
        try {
          const courseRes = await getCourseById(parentId);
          if (courseRes.data && courseRes.data.success) {
            setCourseTitle(courseRes.data.course.title);
          }
        } catch (cErr) {
          console.warn(
            "Parent course not found. Emulating placeholder headers.",
            cErr,
          );
        }
      } else {
        throw new Error("Lesson API returned unsuccessful status.");
      }
    } catch (err) {
      console.error("Error loading lesson details from backend API.", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (lessonId) {
      fetchLessonData();
    }
  }, [lessonId]);
  useEffect(() => {
    setErrors({});
  }, [title, content, orderNo, file, youtubeUrl, videoType]);
  // 2. Validate Form parameters
  const validate = () => {
    const tempErrors = {};
    if (!title.trim()) {
      tempErrors.title = "Lesson title is required.";
    } else if (title.length > 100) {
      tempErrors.title = "Title must be 100 characters or less.";
    }
    if (!content.trim()) {
      tempErrors.content = "Content is required.";
    } else if (content.length > 1000) {
      tempErrors.content = "Content must be 1000 characters or less.";
    }
    if (!orderNo) {
      tempErrors.orderNo = "Lesson order sequence is required.";
    }
    if (videoType === "upload" && !file && !youtubeUrl) {
      // Allow saving without uploading new file if there is already an existing video
    }
    if (videoType === "youtube") {
      if (!youtubeUrl.trim()) {
        tempErrors.youtubeUrl = "YouTube URL is required.";
      } else if (
        !youtubeUrl.includes("youtube.com/") &&
        !youtubeUrl.includes("youtu.be/")
      ) {
        tempErrors.youtubeUrl = "Please provide a valid YouTube URL.";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  // 3. Save Changes handler
  const handleFormSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setProgress(0);
    try {
      // Step 1: Update metadata structure (PUT /api/lessons/:id)
      const updatePayload = {
        title,
        content,
        order_no: Number(orderNo),
      };
      await updateLesson(lessonId, updatePayload);
      // Step 2: Handle uploads or youtube URL updates
      if (videoType === "upload" && file) {
        const formData = new FormData();
        formData.append("video", file);

        await uploadLessonVideo(lessonId, formData, (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress(percent);
        });
      } else if (videoType === "youtube" && youtubeUrl) {
        await addYoutubeVideo(lessonId, youtubeUrl);
      }
      toast.success("Lesson updated successfully.");
      toast.success("Lesson updated successfully.");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate(`/teacher/course/${courseId}/lessons`);
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Unable to update lesson.");
    } finally {
      // Keep loading on success to prevent inputs flashing active
      setLoading(false);
    }
  };
  const handleFormCancel = () => {
    navigate(`/teacher/course/${courseId || "course_1"}/lessons`);
  };
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        {/* Toast Container */}
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
        {isLoading && <EditLessonSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && <EditLessonError onRetry={fetchLessonData} />}
        {/* Form content loaded view */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header tools */}
            <EditLessonHeader
              courseId={courseId}
              loading={loading}
              onSubmit={handleFormSubmit}
            />
            {/* Split layout: Form (65%) & Preview Card (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form panel */}
              <div className="lg:col-span-8 w-full">
                <EditLessonForm
                  title={title}
                  setTitle={setTitle}
                  content={content}
                  setContent={setContent}
                  orderNo={orderNo}
                  setOrderNo={setOrderNo}
                  videoType={videoType}
                  setVideoType={setVideoType}
                  file={file}
                  setFile={setFile}
                  youtubeUrl={youtubeUrl}
                  setYoutubeUrl={setYoutubeUrl}
                  progress={progress}
                  errors={errors}
                  loading={loading}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
              {/* Real-time Preview Panel */}
              <div className="lg:col-span-4 w-full">
                <LessonPreviewCard
                  title={title}
                  description={content}
                  orderNo={orderNo}
                  videoSource={videoType}
                  courseTitle={courseTitle}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
