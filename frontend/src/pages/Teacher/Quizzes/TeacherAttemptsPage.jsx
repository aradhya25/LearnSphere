import React, { useState, useEffect } from "react";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import TeacherAttemptsHeader from "../../../components/TeacherAttempts/TeacherAttemptsHeader";
import TeacherAttemptsFilters from "../../../components/TeacherAttempts/TeacherAttemptsFilters";
import TeacherAttemptsTable from "../../../components/TeacherAttempts/TeacherAttemptsTable";
import TeacherAttemptDetailsModal from "../../../components/TeacherAttempts/TeacherAttemptDetailsModal";
import TeacherAttemptsSkeleton from "../../../components/TeacherAttempts/TeacherAttemptsSkeleton";
import TeacherAttemptsEmpty from "../../../components/TeacherAttempts/TeacherAttemptsEmpty";
import TeacherAttemptsError from "../../../components/TeacherAttempts/TeacherAttemptsError";
import { getTeacherAttempts } from "../../../services/teacherAttemptApi";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_ATTEMPTS = [
//   {
//     id: "att_1",
//     student_id: "student_1",
//     student_name: "Rahul Sharma",
//     student_email: "rahul@gmail.com",
//     course_id: "course_1",
//     course_title: "Java Programming",
//     lesson_id: "les_1",
//     lesson_title: "Introduction",
//     quiz_id: "quiz_1",
//     quiz_title: "Java Basics",
//     score: 8,
//     total_questions: 10,
//     percentage: 80,
//     attempted_at: "2026-07-04T11:00:00.000Z",
//   },
//   {
//     id: "att_2",
//     student_id: "student_2",
//     student_name: "Priya Patel",
//     student_email: "priya@gmail.com",
//     course_id: "course_1",
//     course_title: "Java Programming",
//     lesson_id: "les_1",
//     lesson_title: "Introduction",
//     quiz_id: "quiz_1",
//     quiz_title: "Java Basics",
//     score: 3,
//     total_questions: 10,
//     percentage: 30,
//     attempted_at: "2026-07-04T11:30:00.000Z",
//   },
// ];
export default function TeacherAttemptsPage() {
  // Loader states
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search & Filter state values
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'highest' | 'lowest'
  // Modal detail targets
  const [viewingAttempt, setViewingAttempt] = useState(null);
  const fetchAttemptsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTeacherAttempts();
      if (response.data && response.data.success) {
        setAttempts(response.data.attempts || []);
      } else {
        throw new Error("API server returned unsuccessful status.");
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAttemptsData();
  }, []);
  // Filter & sort logic on frontend
  const filteredAttempts = attempts
    .filter((att) => {
      const searchLower = search.toLowerCase();
      return (
        (att.student_name || "").toLowerCase().includes(searchLower) ||
        (att.student_email || "").toLowerCase().includes(searchLower) ||
        (att.course_title || "").toLowerCase().includes(searchLower) ||
        (att.lesson_title || "").toLowerCase().includes(searchLower) ||
        (att.quiz_title || "").toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.attempted_at || 0).getTime() -
          new Date(a.attempted_at || 0).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          new Date(a.attempted_at || 0).getTime() -
          new Date(b.attempted_at || 0).getTime()
        );
      }
      if (sortBy === "highest") {
        return (b.percentage || 0) - (a.percentage || 0);
      }
      if (sortBy === "lowest") {
        return (a.percentage || 0) - (b.percentage || 0);
      }
      return 0;
    });
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        {/* Loading skeleton */}
        {isLoading && <TeacherAttemptsSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && (
          <TeacherAttemptsError onRetry={fetchAttemptsData} />
        )}
        {/* Content Loaded view */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header title */}
            <TeacherAttemptsHeader />
            {/* Filters bar */}
            <TeacherAttemptsFilters
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {/* Attempts list */}
            {filteredAttempts.length > 0 ? (
              <TeacherAttemptsTable
                attempts={filteredAttempts}
                onViewDetails={(attempt) => setViewingAttempt(attempt)}
              />
            ) : (
              <TeacherAttemptsEmpty />
            )}
          </div>
        )}
        {/* Details Review Modal Overlay */}
        <TeacherAttemptDetailsModal
          isOpen={!!viewingAttempt}
          onClose={() => setViewingAttempt(null)}
          attempt={viewingAttempt}
        />
      </div>
    </TeacherLayout>
  );
}
