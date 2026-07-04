import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherLayout from '../../../components/TeacherDashboard/TeacherLayout';
import EditQuestionHeader from '../../../components/TeacherQuizzes/EditQuestionHeader';
import EditQuestionForm from '../../../components/TeacherQuizzes/EditQuestionForm';
import QuestionPreviewCard from '../../../components/TeacherQuizzes/QuestionPreviewCard';
import EditQuestionSkeleton from '../../../components/TeacherQuizzes/EditQuestionSkeleton';
import EditQuestionError from '../../../components/TeacherQuizzes/EditQuestionError';
import { getQuestionById, getQuizById, updateQuestion } from '../../../services/teacherQuizApi';
import { getLessonById } from '../../../services/teacherQuizApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function EditQuestionPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  // Loaded quiz metadata profiles
  const [quizId, setQuizId] = useState(null);
  const [lessonId, setLessonId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  // Page loading & connection error states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState(null);
  // Form states
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  // Statuses
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fetchQuestionDetails = async () => {
    setIsPageLoading(true);
    setError(null);
    try {
      // 1. GET /api/quizzes/questions/:questionId
      const qResponse = await getQuestionById(questionId);
      if (qResponse.data && qResponse.data.success) {
        const qObj = qResponse.data.question;
        setQuestionText(qObj.question || '');
        setOptionA(qObj.option_a || '');
        setOptionB(qObj.option_b || '');
        setOptionC(qObj.option_c || '');
        setOptionD(qObj.option_d || '');
        setCorrectAnswer(qObj.correct_answer || '');
        setQuizId(qObj.quiz_id);
        // 2. Fetch quiz to get lesson_id
        if (qObj.quiz_id) {
          const quizResponse = await getQuizById(qObj.quiz_id);
          if (quizResponse.data && quizResponse.data.success) {
            const quizObj = quizResponse.data.quiz;
            setLessonId(quizObj.lesson_id);
            // 3. Fetch lesson to get course_id
            if (quizObj.lesson_id) {
              const lessonRes = await getLessonById(quizObj.lesson_id);
              if (lessonRes.data && lessonRes.data.success) {
                setCourseId(lessonRes.data.lesson.course_id);
              }
            }
          }
        }
      } else {
        throw new Error('API server returned unsuccessful status.');
      }
    } catch (err) {
      console.error("Unable to load question details.", err);
      setError(err);
    } finally {
      setIsPageLoading(false);
    }
  };
  useEffect(() => {
    if (questionId) {
      fetchQuestionDetails();
    }
  }, [questionId]);
  // Form onChange handlers that clear validation keys
  const handleQuestionChange = (val) => {
    setQuestionText(val);
    if (errors.questionText) {
      setErrors((prev) => ({ ...prev, questionText: null }));
    }
  };
  const handleOptAChange = (val) => {
    setOptionA(val);
    if (errors.optionA) {
      setErrors((prev) => ({ ...prev, optionA: null }));
    }
  };
  const handleOptBChange = (val) => {
    setOptionB(val);
    if (errors.optionB) {
      setErrors((prev) => ({ ...prev, optionB: null }));
    }
  };
  const handleOptCChange = (val) => {
    setOptionC(val);
    if (errors.optionC) {
      setErrors((prev) => ({ ...prev, optionC: null }));
    }
  };
  const handleOptDChange = (val) => {
    setOptionD(val);
    if (errors.optionD) {
      setErrors((prev) => ({ ...prev, optionD: null }));
    }
  };
  const handleCorrectChange = (val) => {
    setCorrectAnswer(val);
    if (errors.correctAnswer) {
      setErrors((prev) => ({ ...prev, correctAnswer: null }));
    }
  };
  const validate = () => {
    const tempErrors = {};
    if (!questionText.trim()) {
      tempErrors.questionText = 'Question text is required.';
    } else if (questionText.length > 500) {
      tempErrors.questionText = 'Question must be 500 characters or less.';
    }
    if (!optionA.trim()) {
      tempErrors.optionA = 'Option A is required.';
    }
    if (!optionB.trim()) {
      tempErrors.optionB = 'Option B is required.';
    }
    if (!optionC.trim()) {
      tempErrors.optionC = 'Option C is required.';
    }
    if (!optionD.trim()) {
      tempErrors.optionD = 'Option D is required.';
    }
    if (!correctAnswer) {
      tempErrors.correctAnswer = 'Correct answer is required.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleFormSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // PUT /api/quizzes/questions/:questionId
      const payload = {
        question: questionText,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_answer: correctAnswer
      };
      const response = await updateQuestion(questionId, payload);
      if (response.data && response.data.success) {
        toast.success("Question updated successfully.");
        // Redirect after 1 second
        setTimeout(() => {
          navigate(`/teacher/quiz/${quizId}/questions`);
        }, 1000);
      } else {
        throw new Error(response.data.message || 'Unable to update question.');
      }
    } catch (err) {
      console.error("Backend question update failed.", err);
      const backendMsg = err.response?.data?.message || err.message || "Unable to update question.";
      toast.error(backendMsg);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFormCancel = () => {
    if (quizId) {
      navigate(`/teacher/quiz/${quizId}/questions`);
    } else {
      navigate('/teacher/courses');
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
        {isPageLoading && <EditQuestionSkeleton />}
        {!isPageLoading && error && (
          <EditQuestionError onRetry={fetchQuestionDetails} />
        )}
        {!isPageLoading && !error && (
          <div className="space-y-8">
            
            {/* Header toolbar */}
            <EditQuestionHeader
              quizId={quizId}
              lessonId={lessonId}
              courseId={courseId}
              loading={loading}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
            {/* Split layout: Form (65%) & Live Preview Card (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Input Card */}
              <div className="lg:col-span-8 w-full">
                <EditQuestionForm
                  questionText={questionText}
                  setQuestionText={handleQuestionChange}
                  optionA={optionA}
                  setOptionA={handleOptAChange}
                  optionB={optionB}
                  setOptionB={handleOptBChange}
                  optionC={optionC}
                  setOptionC={handleOptCChange}
                  optionD={optionD}
                  setOptionD={handleOptDChange}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={handleCorrectChange}
                  errors={errors}
                  loading={loading}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
              {/* Live Preview Card */}
              <div className="lg:col-span-4 w-full">
                <QuestionPreviewCard
                  questionText={questionText}
                  optionA={optionA}
                  optionB={optionB}
                  optionC={optionC}
                  optionD={optionD}
                  correctAnswer={correctAnswer}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
