import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// Student Pages
import StudentDashboard from "../pages/Student/Dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoutes/ProtectedRoute";
import Courses from "../pages/Student/Courses/MyCoursesPage";
import CourseDetails from "../pages/Student/CourseDetails/CourseDetails";
import LessonPlayerPage from "../pages/Student/Lesson/LessonPlayerPage";
import AllCoursesPage from "../pages/Student/AllCourses/AllCoursePage";
import QuizPage from "../pages/Student/Quiz/QuizPage";
import QuizHistoryPage from "../pages/Student/Quiz/QuizHistoryPage";
import ProgressPage from "../pages/Student/Progress/ProgressPage";
import ProfilePage from "../pages/Student/Profile/ProfilePage";
import TeacherDashboard from "../pages/Teacher/Dashboard/Dashboard";
import Dashboard from "../pages/Teacher/Dashboard/Dashboard";
import MyCoursesPage from "../pages/Teacher/Courses/MyCoursesPage";
import CreateCoursePage from "../pages/Teacher/Courses/CreateCoursePage";
import ManageLessonsPage from "../pages/Teacher/Lessons/ManageLessonsPage";
import CreateLessonPage from "../pages/Teacher/Lessons/CreateLessonPage";
import EditLessonPage from "../pages/Teacher/Lessons/EditLessonPage";
import EditCoursePage from "../pages/Teacher/Courses/EditCoursePage";
import ManageQuizPage from "../pages/Teacher/Quizzes/ManageQuizPage";
import CreateQuizPage from "../pages/Teacher/Quizzes/CreateQuizPage";
import ManageQuestionsPage from "../pages/Teacher/Quizzes/ManageQuestionsPage";
import CreateQuestionPage from "../pages/Teacher/Quizzes/CreateQuestionPage";
import EditQuestionPage from "../pages/Teacher/Quizzes/EditQuestionPage";
import TeacherAttemptsPage from "../pages/Teacher/Quizzes/TeacherAttemptsPage";
// import Lesson from "../pages/Student/Lesson/Lesson";
// import Quiz from "../pages/Student/Quiz/Quiz";
// import Progress from "../pages/Student/Progress/Progress";
// import StudentProfile from "../pages/Student/Profile/Profile";

// Teacher Pages
// import TeacherDashboard from "../pages/Teacher/Dashboard/Dashboard";
// import TeacherCourses from "../pages/Teacher/Courses/Courses";
// import CreateCourse from "../pages/Teacher/Courses/CreateCourse";
// import EditCourse from "../pages/Teacher/Courses/EditCourse";
// import Lessons from "../pages/Teacher/Lessons/Lesson";
// import Quizzes from "../pages/Teacher/Quizzes/Quiz";
// import TeacherProfile from "../pages/Teacher/Profile/Profile";

// Error Pages
// import NotFound from "../pages/NotFound";
// import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/course/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/lesson/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <LessonPlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-courses"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <AllCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/quiz/:lessonId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/quiz-history"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <QuizHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/progress"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <MyCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/course/:courseId/lessons"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ManageLessonsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/course/:courseId/lesson/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateLessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/lesson/:lessonId/edit"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <EditLessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/course/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <EditCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/lesson/:lessonId/quiz"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ManageQuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/lesson/:lessonId/quiz/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateQuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/quiz/:quizId/questions"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ManageQuestionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/quiz/:quizId/question/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateQuestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/question/edit/:questionId"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <EditQuestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/attempts"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherAttemptsPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/lessons/:id" element={<Lesson />} /> */}
        {/* <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<StudentProfile />} /> */}

        {/* Teacher Routes */}
        {/* <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path="/teacher/courses" element={<TeacherCourses />} />
        <Route path="/teacher/course/create" element={<CreateCourse />} />
        <Route path="/teacher/course/edit/:id" element={<EditCourse />} />
        <Route path="/teacher/lessons" element={<Lessons />} />
        <Route path="/teacher/quizzes" element={<Quizzes />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} /> */}

        {/* Error Pages */}
        {/* <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
