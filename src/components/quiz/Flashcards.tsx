import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Phrase } from "@/lessons/types";
import { shuffle } from "./quiz";
import { Missed, Progress, QMeta } from "./parts";

export function Flashcards({ phrases }: { phrases: Phrase[] }) {
  const [round, setRound] = useState(0);
  return <Round key={round} phrases={phrases} restart={() => setRound(round + 1)} />;
}

function Round({ phrases, restart }: { phrases: Phrase[]; restart: () => void }) {
  const [queue, setQueue] = useState<Phrase[]>(() => shuffle(phrases));
  const [shown, setShown] = useState(false);
  const [known, setKnown] = useState(0);
  const [repeats, setRepeats] = useState<Phrase[]>([]);
  const [seen, setSeen] = useState(0);

  const card = queue[0];
  const total = phrases.length;

  if (!card) {
    const firstTry = total - repeats.length;
    return (
      <div className="result">
        <p className="score">{firstTry}<small> из {total}</small></p>
        <p className="result-text">
          {repeats.length === 0 ? "Все фразы вспомнили с первого раза." : `С первого раза: ${firstTry}. Возвращались к фразам: ${repeats.length}.`}
        </p>
        <Missed items={repeats} />
        <Button variant="main" onClick={restart}>Заново</Button>
      </div>
    );
  }

  const next = (ok: boolean) => {
    const rest = queue.slice(1);
    if (ok) setKnown(known + 1);
    else {
      rest.push(card);
      if (!repeats.includes(card)) setRepeats([...repeats, card]);
    }
    setQueue(rest);
    setSeen(seen + 1);
    setShown(false);
  };

  return (
    <div>
      <Progress done={known} total={total} />
      <QMeta left={`Выучено ${known} из ${total} · в очереди ${queue.length}`} onRestart={restart} />
      <p className="prompt-label">Как по-английски?</p>
      <p className="prompt">{card.ru}</p>
      {!shown ? (
        <Button variant="main" size="next" style={{ marginTop: 0 }} onClick={() => setShown(true)}>Показать ответ</Button>
      ) : (
        <>
          <div className="answer-box">
            <p className="ph-en">{card.en}</p>
            <p className="ph-ex">{card.ex}</p>
          </div>
          <div className="btn-row">
            <Button variant="ok" onClick={() => next(true)}>Знаю</Button>
            <Button variant="warn" onClick={() => next(false)}>Повторить</Button>
          </div>
        </>
      )}
    </div>
  );
}
