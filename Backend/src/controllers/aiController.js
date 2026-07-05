const model = require("../services/aiService");
const { v4: uuidv4 } = require("uuid");

const { addQuestion, getQuizWithTeacher } = require("../models/quizModel");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (prompt) => {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result;
    } catch (err) {
      lastError = err;

      if (err.status === 503 && attempt < 3) {
        console.log(`Gemini busy. Retrying... (${attempt}/3)`);
        await sleep(2000);
        continue;
      }

      throw err;
    }
  }

  throw lastError;
};

exports.generateQuiz = async (req, res) => {
  try {
    const { quiz_id, topic, difficulty, numberOfQuestions } = req.body;

    // Validate input
    if (!quiz_id || !topic || !difficulty || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check quiz ownership
    const quiz = await getQuizWithTeacher(quiz_id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    if (quiz.created_by !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this quiz",
      });
    }

    const prompt = `
Generate ${numberOfQuestions} high-quality multiple-choice questions.

Topic:
${topic}

Difficulty:
${difficulty}

Instructions:

1. Return ONLY a valid JSON array.
2. Do NOT use markdown.
3. Do NOT wrap the response in \`\`\`json.
4. Do NOT include explanations or extra text.
5. Generate exactly ${numberOfQuestions} questions.
6. Each question must have exactly four options.
7. Only one option must be correct.
8. correct_answer must be only "A", "B", "C", or "D".
9. Make incorrect options realistic and plausible.
10. Avoid duplicate or very similar questions.
11. Questions should test conceptual understanding, not simple memorization.
12. Use clear and grammatically correct English.

Return in this exact format:

[
  {
    "question": "",
    "option_a": "",
    "option_b": "",
    "option_c": "",
    "option_d": "",
    "correct_answer": "A"
  }
]
`;

    const result = await generateWithRetry(prompt);

    const response = await result.response;

    const text = response.text();

    // Remove markdown if Gemini returns it
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanText);

    if (!Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Invalid AI response",
      });
    }
    if (questions.length !== Number(numberOfQuestions)) {
      return res.status(400).json({
        success: false,
        message: `AI generated ${questions.length} questions instead of ${numberOfQuestions}. Please try again.`,
      });
    }
    let inserted = 0;

    for (const q of questions) {
      if (
        !q.question ||
        !q.option_a ||
        !q.option_b ||
        !q.option_c ||
        !q.option_d ||
        !q.correct_answer
      ) {
        continue;
      }

      await addQuestion(
        uuidv4(),
        quiz_id,
        q.question,
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,
        q.correct_answer,
      );

      inserted++;
    }

    res.status(201).json({
      success: true,
      message: "Quiz generated successfully",
      totalQuestions: inserted,
      questions,
    });
  } catch (error) {
    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "AI service is temporarily busy. Please try again in a few seconds.",
      });
    }

    if (error instanceof SyntaxError) {
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid response. Please try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};
exports.generateLessonSummary = async (req, res) => {
  try {
    const { lessonContent } = req.body;

    if (!lessonContent || lessonContent.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Lesson content is required",
      });
    }

    const prompt = `
You are an experienced teacher creating study notes for students.

Your task is to convert the lesson into a clear, descriptive, and exam-oriented summary.

Instructions:
- Read the entire lesson carefully.
- Use ONLY the information provided in the lesson.
- Never invent, assume, or add extra information.
- Explain concepts in simple English suitable for students.
- Keep the flow logical so that a student can understand the topic without reading the original lesson.
- Make the summary descriptive instead of just listing points.
- Keep the summary between 300 and 500 words.
- Use plain text only.
- Use bullet points where appropriate.
- Avoid repeating information.

The summary should include:

Topic Overview
- Briefly explain what the lesson is about.

Concept Explanation
- Explain every important concept in simple language.
- Include examples only if they are present in the lesson.

Important Definitions
- Explain important terms and definitions.

Key Facts
- Mention important rules, characteristics, properties, classifications, steps, or features discussed in the lesson.

Important Formulas
- Include formulas exactly as written in the lesson.
- Briefly explain what each formula is used for.
- If no formulas are present, state "No formulas mentioned."

Exam-Oriented Notes
- Highlight concepts that students should remember for exams.
- Mention important differences, advantages, disadvantages, processes, or exceptions if present.

Quick Revision
- End with 8–10 concise revision points that cover the entire lesson.

Rules:
- Make the explanation student-friendly.
- Focus on conceptual understanding.
- Preserve technical terms exactly as written.
- Do not use Markdown.
- Do not use tables.
- Do not invent information.
- Ensure the summary alone is enough for revision before attempting quizzes.

Lesson:
${lessonContent}
`;

    const result = await generateWithRetry(prompt);

    const response = await result.response;

    const summary = result.response.text().trim();
    if (!summary) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate summary.",
      });
    }

    return res.json({
      success: true,
      summary,
    });
  } catch (error) {
    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "AI service is temporarily busy. Please try again in a few seconds.",
      });
    }

    if (error instanceof SyntaxError) {
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid response. Please try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};
// exports.explainAnswer = async (req, res) => {

//   try {

//     const {

//       question,

//       option_a,

//       option_b,

//       option_c,

//       option_d,

//       correct_answer,

//       student_answer

//     } = req.body;

//     const prompt = `
// You are an expert teacher.

// Explain this quiz answer.

// Question:
// ${question}

// Options

// A. ${option_a}

// B. ${option_b}

// C. ${option_c}

// D. ${option_d}

// Student selected:
// ${student_answer}

// Correct Answer:
// ${correct_answer}

// Instructions

// 1. Explain why the student's answer is incorrect.

// 2. Explain why the correct answer is correct.

// 3. Keep explanation under 120 words.

// 4. Use very simple English.

// 5. Return plain text only.

// `;

//     const result = await model.generateContent(prompt);

//     const response = await result.response;

//     const explanation = response.text();

//     return res.json({

//       success: true,

//       explanation

//     });

//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({

//       success: false,

//       message: error.message

//     });

//   }

// };
