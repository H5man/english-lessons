import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import LessonPage from "@/pages/Lesson";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lesson/:id/:section?" element={<LessonPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
