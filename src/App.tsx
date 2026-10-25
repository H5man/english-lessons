import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import LessonPage from "@/pages/Lesson";
import MethodsPage from "@/pages/Methods";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lesson/:id/:section?" element={<LessonPage />} />
      <Route path="/methods/:section?" element={<MethodsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
