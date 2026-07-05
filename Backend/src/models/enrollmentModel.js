const pool = require("../config/db");

const enrollCourse = async (id, user_id, course_id) => {
  const result = await pool.query(
    `INSERT INTO enrollments
    (id,user_id,course_id)
    VALUES($1,$2,$3)
    RETURNING *`,
    [id, user_id, course_id]
  );

  return result.rows[0];
};

const getMyCourses = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      c.*,
      u.name AS instructor_name

    FROM enrollments e

    JOIN courses c
      ON e.course_id = c.id

    LEFT JOIN users u
      ON c.created_by = u.id

    WHERE e.user_id = $1

    ORDER BY e.enrolled_at DESC
    `,
    [userId]
  );

  return result.rows;
};

const unenrollCourse = async (userId, courseId) => {
  await pool.query(
    `DELETE FROM enrollments
     WHERE user_id=$1
     AND course_id=$2`,
    [userId, courseId]
  );
};

module.exports = {
  enrollCourse,
  getMyCourses,
  unenrollCourse,
};