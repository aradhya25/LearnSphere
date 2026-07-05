import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import AiQuizGeneratorHeader from "../../../components/AiQuiz/AiQuizGeneratorHeader";
import AiQuizGeneratorForm from "../../../components/AiQuiz/AiQuizGeneratorForm";
import AiInfoCard from "../../../components/AiQuiz/AiInfoCard";
import AiGeneratorLoadingOverlay from "../../../components/AiQuiz/AiGeneratorLoadingOverlay";
import { getTeacherQuizzes, generateQuiz } from "../../../services/aiApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AiQuizGeneratorPage() {
  const navigate = useNavigate();
  // Load available quizzes states
  const [quizzes, setQuizzes] = useState([]);
  // Form states
  const [quizId, setQuizId] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  // Statuses
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fetchQuizzes = async () => {
    try {
      const response = await getTeacherQuizzes();
      if (response.data && response.data.success) {
        setQuizzes(response.data.quizzes || []);
      }
    } catch (err) {
      console.warn(
        "Backend quiz catalog not found for AI generator. Emulating details.",
        err,
      );
      // Mock quizzes if offline
      setQuizzes([
        { id: "quiz_1", title: "Qubits Representation Quiz" },
        { id: "quiz_2", title: "Bloch Sphere & Operations Quiz" },
      ]);
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  const validate = () => {
    const tempErrors = {};
    if (!quizId) {
      tempErrors.quizId = "Please select a target quiz.";
    }
    if (!topic.trim()) {
      tempErrors.topic = "Topic prompt details or lesson notes are required.";
    }
    if (!difficulty) {
      tempErrors.difficulty = "Please select a difficulty level.";
    }
    if (!numberOfQuestions) {
      tempErrors.numberOfQuestions =
        "Please select the number of questions to generate.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleFormSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // POST /api/ai/generate-quiz
      const payload = {
        quiz_id: quizId,
        topic,
        difficulty,
        numberOfQuestions: Number(numberOfQuestions),
      };
      const response = await generateQuiz(payload);
      if (response.data && response.data.success) {
        const count = response.data.totalQuestions || numberOfQuestions;
        toast.success(`Successfully generated ${count} questions.`);

        // Redirect after 1 second
        setTimeout(() => {
          navigate(`/teacher/quiz/${quizId}/questions`);
        }, 1000);
      } else {
        throw new Error(response.data.message || "AI quiz generation failed.");
      }
    } catch (err) {
      console.error("AI Quiz generation failed.", err);

      const backendMsg =
        err.response?.data?.message ||
        err.message ||
        "Unable to generate quiz.";
      toast.error(backendMsg);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
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
        <div className="space-y-8 animate-fadeIn">
          {/* Header Title section */}
          <AiQuizGeneratorHeader />
          {/* Split layout: Form (65%) | AI info card (35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form settings card */}
            <div className="lg:col-span-8 w-full">
              <AiQuizGeneratorForm
                quizzes={quizzes}
                quizId={quizId}
                setQuizId={setQuizId}
                topic={topic}
                setTopic={setTopic}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                numberOfQuestions={numberOfQuestions}
                setNumberOfQuestions={setNumberOfQuestions}
                errors={errors}
                loading={loading}
                onSubmit={handleFormSubmit}
              />
            </div>
            {/* AI Info Highlights Card */}
            <div className="lg:col-span-4 w-full">
              <AiInfoCard />
            </div>
          </div>
        </div>
        {/* Loading Overlay */}
        <AiGeneratorLoadingOverlay isOpen={loading} />
      </div>
    </TeacherLayout>
  );
}
