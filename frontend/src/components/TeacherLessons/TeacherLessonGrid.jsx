import React from 'react';
import TeacherLessonCard from './TeacherLessonCard';
export default function TeacherLessonGrid({ lessons = [], onDeleteInit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {lessons.map((lesson) => (
        <TeacherLessonCard
          key={lesson.id}
          lesson={lesson}
          onDeleteInit={onDeleteInit}
        />
      ))}
    </div>
  );
}