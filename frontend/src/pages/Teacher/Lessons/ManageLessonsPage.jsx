import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import TeacherLessonsHeader from "../../../components/TeacherLessons/TeacherLessonsHeader";
import TeacherCourseSummary from "../../../components/TeacherLessons/TeacherCourseSummary";
import TeacherLessonFilters from "../../../components/TeacherLessons/TeacherLessonFilters";
import TeacherLessonGrid from "../../../components/TeacherLessons/TeacherLessonGrid";
import DeleteLessonModal from "../../../components/TeacherLessons/DeleteLessonModal";
import TeacherLessonsSkeleton from "../../../components/TeacherLessons/TeacherLessonsSkeleton";
import TeacherLessonsEmpty from "../../../components/TeacherLessons/TeacherLessonsEmpty";
import TeacherLessonsError from "../../../components/TeacherLessons/TeacherLessonsError";
import {
  getCourseById,
  getLessons,
  deleteLesson,
} from "../../../services/teacherLessonApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_COURSE = {
//   id: "course_1",
//   title: "Introduction to Quantum Computing",
//   description:
//     "Understand superposition, qubits, quantum gates, and build quantum circuits using AI simulations. Complete course structure detailing concepts and logic gates.",
//   language: "English",
//   thumbnail: "/hero_illustration.jpg",
//   created_at: "2026-05-15T08:00:00Z",
// };
// const PREVIEW_LESSONS = [
//   {
//     id: "les_1",
//     title: "Introduction to Qubits & Superposition",
//     description:
//       "In this lesson you will learn the absolute basics of Qubits and Superposition math calculations.",
//     duration: 15,
//     order_no: 1,
//     status: "published",
//     created_at: "2026-06-28T10:00:00Z",
//     video_url: "https://...",
//   },
//   {
//     id: "les_2",
//     title: "Understanding Quantum Logic Gates",
//     description:
//       "Program logic gates and perform quantum circuit simulations using AI models.",
//     duration: 20,
//     order_no: 2,
//     status: "published",
//     created_at: "2026-06-28T11:00:00Z",
//     video_url: "https://...",
//   },
//   {
//     id: "les_3",
//     title: "Building Circuits with Qiskit",
//     description:
//       "Deploy manual circuits into real IBM Quantum computing structures using Qiskit.",
//     duration: 25,
//     order_no: 3,
//     status: "draft",
//     created_at: "2026-06-29T14:45:00Z",
//     video_url: "https://...",
//   },
// ];
export default function ManageLessonsPage() {
  const { courseId } = useParams();
  // State managers
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filters & Searches states
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("order"); // 'order' | 'newest' | 'oldest' | 'az'
  // Delete modal targets
  const [deleteTarget, setDeleteTarget] = useState(null);
  // Fetch Course details & lessons list concurrently
  const fetchLessonsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [courseRes, lessonsRes] = await Promise.all([
        getCourseById(courseId),
        getLessons(courseId),
      ]);
      if (courseRes.data.success && lessonsRes.data.success) {
        setCourse(courseRes.data.course);
        setLessons(lessonsRes.data.lessons || []);
      } else {
        throw new Error("API server returned error status.");
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLessonsData();
  }, [courseId]);
  // Delete lesson trigger
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      // DELETE /api/lessons/:id
      const response = await deleteLesson(deleteTarget.id);
      if (response.data && response.data.success) {
        toast.success("Lesson deleted successfully.");
        setDeleteTarget(null);
        await fetchLessonsData();
      } else {
        throw new Error("Unable to delete lesson.");
      }
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Unable to delete lesson.");
    }
  };
  // Frontend Sorting & Filtering Mappings
  const filteredLessons = lessons
    .filter((lesson) => {
      return lesson.title?.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "order") {
        return (a.order_no || 0) - (b.order_no || 0);
      }
      if (sortBy === "newest") {
        return (
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          new Date(a.created_at || 0).getTime() -
          new Date(b.created_at || 0).getTime()
        );
      }
      if (sortBy === "az") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });
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
        {/* Loading skeleton loaders */}
        {isLoading && <TeacherLessonsSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && (
          <TeacherLessonsError onRetry={fetchLessonsData} />
        )}
        {/* Content Loaded view */}
        {!isLoading && !error && course && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Breadcrumbs toolbar */}
            <TeacherLessonsHeader courseId={courseId} />
            {/* Course Information Summary */}
            <TeacherCourseSummary
              course={course}
              totalLessons={lessons.length}
              publishedLessons={
                lessons.filter((l) => l.status === "published").length
              }
            />
            {/* Filters & Searches toolbar */}
            <TeacherLessonFilters
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {/* Lessons mapping display */}
            {filteredLessons.length > 0 ? (
              <TeacherLessonGrid
                lessons={filteredLessons}
                onDeleteInit={(lesson) => setDeleteTarget(lesson)}
                onEdit={(lesson) =>
                  navigate(`/teacher/lesson/edit/${lesson.id}`)
                }
                onQuiz={(lesson) =>
                  navigate(`/teacher/lesson/${lesson.id}/quiz`)
                }
                onPreview={(lesson) =>
                  navigate(`/teacher/lesson/preview/${lesson.id}`)
                }
              />
            ) : (
              <TeacherLessonsEmpty courseId={courseId} />
            )}
          </div>
        )}
        {/* Delete Confirmation Modal Overlay */}
        <DeleteLessonModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          lessonTitle={deleteTarget?.title}
        />
      </div>
    </TeacherLayout>
  );
}
