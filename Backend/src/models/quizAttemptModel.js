const pool = require("../config/db");

const createAttempt = async (
  id,
  user_id,
  quiz_id,
  score,
  total_questions
) => {
  const result = await pool.query(
    `INSERT INTO quiz_attempts
    (id,user_id,quiz_id,score,total_questions)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,
    [id, user_id, quiz_id, score, total_questions]
  );

  return result.rows[0];
};

const getAttemptsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT
        qa.id,
        qa.score,
        qa.total_questions,
        qa.attempted_at,

        q.id AS quiz_id,
        q.title AS quiz_title,

        l.id AS lesson_id,
        l.title AS lesson_title,

        c.id AS course_id,
        c.title AS course_title

     FROM quiz_attempts qa

     JOIN quizzes q
       ON qa.quiz_id = q.id

     JOIN lessons l
       ON q.lesson_id = l.id

     JOIN courses c
       ON l.course_id = c.id

     WHERE qa.user_id = $1

     ORDER BY qa.attempted_at DESC`,
    [userId]
  );

  return result.rows;
};
const getAllAttempts = async (teacherId) => {
  const result = await pool.query(
    `
    SELECT
      qa.id,
      qa.score,
      qa.total_questions,
      qa.attempted_at,

      u.id AS student_id,
      u.name AS student_name,
      u.email AS student_email,

      q.id AS quiz_id,
      q.title AS quiz_title,

      l.id AS lesson_id,
      l.title AS lesson_title,

      c.id AS course_id,
      c.title AS course_title,

      ROUND((qa.score::decimal / qa.total_questions) * 100, 2) AS percentage

    FROM quiz_attempts qa

    JOIN users u
      ON qa.user_id = u.id

    JOIN quizzes q
      ON qa.quiz_id = q.id

    JOIN lessons l
      ON q.lesson_id = l.id

    JOIN courses c
      ON l.course_id = c.id

    WHERE c.created_by = $1

    ORDER BY qa.attempted_at DESC
    `,
    [teacherId]
  );

  return result.rows;
};
module.exports = {
  createAttempt,
  getAttemptsByUser,
  getAllAttempts,
};