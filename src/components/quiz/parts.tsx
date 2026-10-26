import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import type { Phrase } from "@/lessons/types";

export function Progress({ done, total }: { done: number; total: number }) {
  return (
    <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
      <div className="progress"><i style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></div>
    </div>
  );
}

export function QMeta({ left, onRestart }: { left: ReactNode; onRestart: () => void }) {
  return (
    <div className="qmeta">
      <span>{left}</span>
      <Button size="restart" onClick={onRestart}>Заново</Button>
    </div>
  );
}

/** Карточка упражнения: трекер (прогресс + счёт + «Заново») отделён в шапку, вопрос — в тело. */
export function Exercise({ done, total, left, onRestart, children }: {
  done: number; total: number; left: ReactNode; onRestart: () => void; children: ReactNode;
}) {
  return (
    <div className="qcard">
      <div className="qhead">
        <Progress done={done} total={total} />
        <QMeta left={left} onRestart={onRestart} />
      </div>
      <div className="qbody">{children}</div>
    </div>
  );
}

export function Missed({ items }: { items: Phrase[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <p className="missed-title">Стоит повторить</p>
      <ul className="missed">
        {items.map((p) => <li key={p.en}>{p.en}<span>{p.ru}</span></li>)}
      </ul>
    </>
  );
}

export function NeedMore({ min }: { min: number }) {
  return <p className="note">Для этого режима в уроке пока мало фраз (нужно хотя бы {min}). Попробуйте режим «Карточки».</p>;
}

export function Options({ options, picked, correct, onPick }: {
  options: Phrase[]; picked: Phrase | null; correct: Phrase; onPick: (p: Phrase) => void;
}) {
  return (
    <ul className="options">
      {options.map((o, i) => {
        let cls = "opt";
        if (picked) {
          if (o === correct) cls += " right";
          else if (o === picked) cls += " wrong";
          else cls += " dim";
        }
        return (
          <li key={o.en}>
            <button className={cls} disabled={!!picked} onClick={() => onPick(o)}>
              <span className="key">{i + 1}</span><span>{o.en}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
