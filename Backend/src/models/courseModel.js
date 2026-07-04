const pool = require("../config/db");

const createCourse = async (
  id,
  title,
  description,
  language,
  thumbnail,
  created_by
) => {
  const result = await pool.query(
    `INSERT INTO courses
    (id,title,description,language,thumbnail,created_by)
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [id, title, description, language, thumbnail, created_by]
  );

  return result.rows[0];
};

const getAllCourses = async () => {
  const result = await pool.query(
    `SELECT * FROM courses
     ORDER BY created_at DESC`
  );

  return result.rows;
};

const getCourseById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM courses
     WHERE id=$1`,
    [id]
  );

  return result.rows[0];
};

const getMyCourses = async (teacherId) => {
  const result = await pool.query(
    `
    SELECT
      c.*,

      COUNT(DISTINCT l.id)::int AS lessons_count,

      COUNT(DISTINCT q.id)::int AS quizzes_count,

      COUNT(DISTINCT e.user_id)::int AS students_count

    FROM courses c

    LEFT JOIN lessons l
      ON l.course_id = c.id

    LEFT JOIN quizzes q
      ON q.lesson_id = l.id

    LEFT JOIN enrollments e
      ON e.course_id = c.id

    WHERE c.created_by = $1

    GROUP BY c.id

    ORDER BY c.created_at DESC;
    `,
    [teacherId]
  );

  return result.rows;
};
const updateCourse = async (
  id,
  title,
  description,
  language,
  thumbnail
) => {

  let query;
  let values;

  if (thumbnail) {

    query = `
      UPDATE courses
      SET
        title=$1,
        description=$2,
        language=$3,
        thumbnail=$4
      WHERE id=$5
      RETURNING *;
    `;

    values = [
      title,
      description,
      language,
      thumbnail,
      id,
    ];

  } else {

    query = `
      UPDATE courses
      SET
        title=$1,
        description=$2,
        language=$3
      WHERE id=$4
      RETURNING *;
    `;

    values = [
      title,
      description,
      language,
      id,
    ];
  }

  const result = await pool.query(query, values);

  return result.rows[0];
};

const deleteCourse = async (id) => {
  await pool.query(
    `DELETE FROM courses
     WHERE id=$1`,
    [id]
  );
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getMyCourses
};