import { Navigate, Route, Routes } from "react-router-dom";
import LessonPage from "@/pages/Lesson";
import { lessons } from "@/lessons";

export default function App() {
  return (
    <Routes>
      {/* Главной страницы-списка нет: корень открывает последний урок (список тем — в модалке заголовка урока). */}
      <Route path="/" element={<Navigate to={`/lesson/${lessons[0].id}`} replace />} />
      <Route path="/lesson/:id/:section?" element={<LessonPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
