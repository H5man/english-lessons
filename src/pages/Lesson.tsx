import { useEffect, useRef, useState } from "react";
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

  const [pickOpen, setPickOpen] = useState(false);

  return (
    <Shell
      // Заголовок — кнопка, открывающая модалку выбора темы (список + поиск).
      title={
        <button type="button" className="title-pick" aria-haspopup="dialog"
          onClick={() => setPickOpen(true)}>
          {lesson.title}
        </button>
      }
      docTitle={`${lesson.title} · ${lesson.date}`}
      footer={<>{lesson.date} · {lesson.phrases.length} {plural(lesson.phrases.length, ["фраза", "фразы", "фраз"])}</>}
      nav={[{ id: "phrases", label: "Фразы", badge: lesson.phrases.length }, { id: "quiz", label: "Упражнения" }]}
      navLabel="Разделы урока" active={section}
      onNav={(s) => navigate(`/lesson/${lessonId}/${s}`, { replace: true })}
    >
      <TopicPick open={pickOpen} current={lessonId} onClose={() => setPickOpen(false)} />
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

// Модалка выбора темы: нативный <dialog> (Esc и возврат фокуса — браузерные), поиск по названию и дате.
function TopicPick({ open, current, onClose }: { open: boolean; current: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setQ(""); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");
  const needle = norm(q.trim());
  const found = lessons.filter((l) => norm(l.title + " " + l.date).includes(needle));

  return (
    <dialog ref={ref} className="pick" aria-label="Выбор темы урока"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className="pick-head">
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск темы…" aria-label="Поиск темы" />
        <button type="button" className="pick-x" onClick={onClose} aria-label="Закрыть">×</button>
      </div>
      <ul className="pick-list">
        {found.map((l) => (
          <li key={l.id}>
            <button type="button" className={"pick-item" + (l.id === current ? " current" : "")}
              onClick={() => { onClose(); if (l.id !== current) navigate(`/lesson/${l.id}`); }}>
              {l.title}
              <small>{l.date}</small>
            </button>
          </li>
        ))}
        {found.length === 0 && <li className="pick-empty">Ничего не найдено</li>}
      </ul>
    </dialog>
  );
}
