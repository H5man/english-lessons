import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { Flashcards } from "@/components/quiz/Flashcards";
import { ChoiceQuiz } from "@/components/quiz/ChoiceQuiz";
import { GapQuiz } from "@/components/quiz/GapQuiz";
import { getLesson, lessons } from "@/lessons";

type Section = "phrases" | "quiz";
type Mode = "cards" | "choice" | "gap";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "cards", label: "Карточки", hint: "Посмотрите на русский, вспомните фразу вслух, потом проверьте себя." },
  { id: "choice", label: "Выбор", hint: "Выберите английскую фразу, которая соответствует русской." },
  { id: "gap", label: "Пропуск", hint: "Вставьте пропущенную фразу в предложение." },
];

export default function LessonPage() {
  const { id = "", section } = useParams();
  const lesson = getLesson(id);
  if (!lesson) return <Navigate to="/" replace />;
  // key: при переходе на другой урок состояние квиза начинается с нуля
  return <LessonView key={lesson.id} lessonId={lesson.id} section={section === "quiz" ? "quiz" : "phrases"} />;
}

function LessonView({ lessonId, section }: { lessonId: string; section: Section }) {
  const lesson = getLesson(lessonId)!;
  const { phrases } = lesson;
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("cards");
  const hint = MODES.find((t) => t.id === mode)!.hint;

  return (
    <Shell
      // Заголовок страницы — выпадающий список всех уроков: тему можно сменить прямо здесь.
      // replace: перебор тем стрелками не засоряет историю.
      title={
        <select className="title-pick" value={lessonId} aria-label="Тема урока"
          onChange={(e) => navigate(`/lesson/${e.target.value}`, { replace: true })}>
          {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
        </select>
      }
      docTitle={`${lesson.title} · ${lesson.date}`}
      footer={<>{lesson.date} · {lesson.phrases.length} {plural(lesson.phrases.length, ["фраза", "фразы", "фраз"])}</>}
      nav={[{ id: "phrases", label: "Фразы", badge: lesson.phrases.length }, { id: "quiz", label: "Упражнения" }]}
      navLabel="Разделы урока" active={section}
      onNav={(s) => navigate(`/lesson/${lessonId}/${s}`, { replace: true })}
    >
      {/* Обе панели всегда смонтированы: состояние квиза не теряется при переключении вкладок */}
      <section className="panel" id="panel-phrases" role="tabpanel" aria-labelledby="main-phrases" hidden={section !== "phrases"}>
        <ol className="phrases">
          {phrases.map((p) => (
            <li className="phrase" key={p.en}>
              <div>
                <p className="ph-en">{p.en}</p>
                <p className="ph-ru">{p.ru}</p>
                <p className="ph-ex">{p.ex}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel" id="panel-quiz" role="tabpanel" aria-labelledby="main-quiz" hidden={section !== "quiz"}>
        <div className="subtabs" role="tablist" aria-label="Режим упражнений">
          {MODES.map((t) => (
            <button key={t.id} role="tab" className="subtab" id={`tab-${t.id}`} aria-selected={mode === t.id}
              aria-controls={`quiz-${t.id}`} onClick={() => setMode(t.id)}>{t.label}</button>
          ))}
        </div>
        <p className="hint">{hint}</p>
        <div id="quiz-cards" hidden={mode !== "cards"}><Flashcards phrases={phrases} /></div>
        <div id="quiz-choice" hidden={mode !== "choice"}><ChoiceQuiz phrases={phrases} /></div>
        <div id="quiz-gap" hidden={mode !== "gap"}><GapQuiz phrases={phrases} /></div>
      </section>
    </Shell>
  );
}

function plural(n: number, f: [string, string, string]) {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return f[0];
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return f[1];
  return f[2];
}
