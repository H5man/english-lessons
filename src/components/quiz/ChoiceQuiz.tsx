import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Phrase } from "@/lessons/types";
import { buildChoice } from "./quiz";
import { Missed, NeedMore, Options, Progress, QMeta } from "./parts";

export function ChoiceQuiz({ phrases }: { phrases: Phrase[] }) {
  const [round, setRound] = useState(0);
  if (phrases.length < 2) return <NeedMore min={2} />;
  return <Round key={round} phrases={phrases} restart={() => setRound(round + 1)} />;
}

function Round({ phrases, restart }: { phrases: Phrase[]; restart: () => void }) {
  const [qs] = useState(() => buildChoice(phrases));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Phrase | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Phrase[]>([]);

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
    <div>
      <Progress done={i} total={qs.length} />
      <QMeta left={`Вопрос ${i + 1} из ${qs.length} · верно ${score}`} onRestart={restart} />
      <p className="prompt-label">Выберите английскую фразу</p>
      <p className="prompt">{q.prompt.ru}</p>
      <Options options={q.options} picked={picked} correct={q.prompt} onPick={pick} />
      {picked && (
        <>
          <p className={"verdict " + (ok ? "ok" : "no")} role="status">{ok ? "Верно!" : "Не совсем. Правильный вариант подсвечен."}</p>
          <Button variant="main" size="next" onClick={next}>{i + 1 === qs.length ? "Результат" : "Дальше"}</Button>
        </>
      )}
    </div>
  );
}
