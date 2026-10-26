import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Phrase } from "@/lessons/types";
import { buildGaps } from "./quiz";
import { Exercise, Missed, NeedMore, Options, Speak } from "./parts";

export function GapQuiz({ phrases }: { phrases: Phrase[] }) {
  const [round, setRound] = useState(0);
  if (phrases.length < 2) return <NeedMore min={2} />;
  return <Round key={round} phrases={phrases} restart={() => setRound(round + 1)} />;
}

function Round({ phrases, restart }: { phrases: Phrase[]; restart: () => void }) {
  const [qs] = useState(() => buildGaps(phrases));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Phrase | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Phrase[]>([]);

  if (qs.length === 0) return <NeedMore min={2} />;
  if (i >= qs.length) {
    return (
      <div className="result">
        <p className="score">{score}<small> из {qs.length}</small></p>
        <p className="result-text">{score === qs.length ? "Без ошибок!" : "Ошибки — это нормально, главное — вернуться к ним."}</p>
        <Missed items={missed} />
        <Button variant="main" onClick={restart}>Заново</Button>
      </div>
    );
  }
  const q = qs[i];
  const ok = picked === q.prompt;
  const pick = (p: Phrase) => {
    setPicked(p);
    if (p === q.prompt) setScore(score + 1);
    else setMissed([...missed, q.prompt]);
  };
  const next = () => { setI(i + 1); setPicked(null); };

  return (
    <Exercise done={i} total={qs.length}
      left={`Вопрос ${i + 1} из ${qs.length} · верно ${score}`} onRestart={restart}>
      <p className="prompt-label">Какая фраза пропущена?</p>
      <div className="sent-row">
        <p className="sentence">
          {q.pieces.map((pc, k) =>
            pc.hidden ? (
              <span key={k} aria-label={picked ? undefined : "пропуск"} className={"blank" + (picked ? (ok ? " blank-filled" : " blank-wrong") : "")}>{pc.text}</span>
            ) : <span key={k}>{pc.text}</span>)}
        </p>
        {/* Озвучка всего предложения — только после ответа, чтобы не подсказывать ответ */}
        {picked && <Speak text={q.prompt.ex} label="Слушать всё предложение" />}
      </div>
      <p className="sent-ru">Подсказка: {q.prompt.ru}</p>
      <Options options={q.options} picked={picked} correct={q.prompt} onPick={pick} />
      {picked && (
        <Button variant="main" size="next" onClick={next}>{i + 1 === qs.length ? "Результат" : "Дальше"}</Button>
      )}
    </Exercise>
  );
}
