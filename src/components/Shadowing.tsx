import { useEffect, useState } from "react";
import type { ShadowSection } from "@/lessons/types";
import { hasAudio, playQueue, stop } from "@/lib/audio";

// How many times each sentence plays; Infinity = loop until stopped.
const REPEATS: { n: number; label: string }[] = [
  { n: 1, label: "1×" }, { n: 2, label: "2×" }, { n: 3, label: "3×" }, { n: Infinity, label: "∞" },
];

type Playing = { sec: number; line: number | null; all: boolean } | null;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M7 4.5v15l13-7.5z" /></svg>
);
const StopIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M6 6h12v12H6z" /></svg>
);

/** Shadowing tab: text of every sentence + audio. Each sentence is voiced once; repetition and "play all" are done here. */
export function Shadowing({ sections, active }: { sections: ShadowSection[]; active: boolean }) {
  const [times, setTimes] = useState(1);
  const [showRu, setShowRu] = useState(false);
  const [playing, setPlaying] = useState<Playing>(null);

  // Stop audio when the tab is hidden or the lesson page unmounts.
  useEffect(() => { if (!active) stop(); }, [active]);
  useEffect(() => () => stop(), []);

  const start = (sec: number, from: number | null) => {
    const lines = sections[sec].lines.filter((l) => hasAudio(l.en));
    const all = from === null;
    const texts = all ? lines.map((l) => l.en) : [sections[sec].lines[from].en];
    playQueue(texts, {
      times,
      onStep: (i) => {
        if (i === null) setPlaying(null);
        else setPlaying({ sec, all, line: all ? sections[sec].lines.indexOf(lines[i]) : from });
      },
    });
  };
  const hasRu = sections.some((s) => s.lines.some((l) => l.ru));

  return (
    <div className="shadow">
      <p className="hint">Слушайте и повторяйте вслух одновременно с диктором, подстраиваясь под ритм и интонацию. Каждое предложение озвучено один раз; повтор настраивается ниже.</p>
      <div className="sh-bar">
        <div className="sh-group" role="radiogroup" aria-label="Сколько раз повторять предложение">
          <span className="sh-label">Повтор</span>
          {REPEATS.map((r) => (
            <button key={r.label} type="button" role="radio" aria-checked={times === r.n}
              className="sh-seg" title={r.n === Infinity ? "По кругу, пока не остановите" : `Каждое предложение ${r.label}`}
              onClick={() => { setTimes(r.n); stop(); }}>{r.label}</button>
          ))}
        </div>
        {hasRu && (
          <label className="sh-ru-toggle">
            <input type="checkbox" checked={showRu} onChange={(e) => setShowRu(e.target.checked)} /> Перевод
          </label>
        )}
      </div>

      {sections.map((s, si) => {
        const allOn = playing?.sec === si && playing.all;
        return (
          <section className="sh-sec" key={s.title + si}>
            <div className="sh-head">
              <h2 className="sh-title">{s.title}</h2>
              <button type="button" className={"sh-all" + (allOn ? " on" : "")}
                onClick={() => (allOn ? stop() : start(si, null))}>
                {allOn ? <><StopIcon /> Стоп</> : <><PlayIcon /> Всё подряд</>}
              </button>
            </div>
            <ol className="sh-lines">
              {s.lines.map((l, li) => {
                const on = playing?.sec === si && playing.line === li;
                const lineOn = on && !playing!.all;
                return (
                  <li key={l.en} className={"sh-line" + (on ? " on" : "")}>
                    <div>
                      <p className="sh-en">{l.who && <span className="sh-who">{l.who}:</span>}{l.en}</p>
                      {showRu && l.ru && <p className="sh-ru">{l.ru}</p>}
                    </div>
                    {hasAudio(l.en) && (
                      <button type="button" className={"speak" + (lineOn ? " on" : "")}
                        aria-label={lineOn ? "Остановить" : "Слушать предложение"} title={lineOn ? "Остановить" : "Слушать"}
                        onClick={() => (lineOn ? stop() : start(si, li))}>
                        {lineOn ? <StopIcon /> : <PlayIcon />}
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
