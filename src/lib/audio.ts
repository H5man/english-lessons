import { audioSlugs } from "@/audio-manifest";

// Должно совпадать с slug() в scripts/voice.py
export const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const hasAudio = (t: string) => audioSlugs.has(slug(t));
export const audioUrl = (t: string) => `${import.meta.env.BASE_URL}audio/${slug(t)}.mp3`;

// Single shared player: any new playback (Speak button or a queue) stops the previous one.
let current: HTMLAudioElement | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let run = 0; // bumps on every stop(); a queue keeps going only while its run id is current
let onStopped: (() => void) | null = null;

export function stop() {
  run++;
  clearTimeout(timer);
  current?.pause();
  current = null;
  const cb = onStopped; onStopped = null; cb?.();
}

export function play(t: string) {
  stop();
  current = new Audio(audioUrl(t));
  void current.play();
}

/**
 * Plays texts in order, each `times` times (Infinity = loop the whole queue),
 * with a pause after each sentence. onStep(i) reports the playing index, onStep(null) the end/stop.
 */
export function playQueue(texts: string[], opts: { times: number; gapMs?: number; repeatGapMs?: number; onStep?: (i: number | null) => void }) {
  stop();
  const id = run;
  const { times, gapMs = 1200, repeatGapMs = 800, onStep } = opts;
  onStopped = () => onStep?.(null);
  const total = Number.isFinite(times) ? Math.max(1, times) : 1;
  const step = (i: number, k: number) => {
    if (id !== run) return;
    if (i >= texts.length) {
      if (Number.isFinite(times)) { onStopped = null; onStep?.(null); return; }
      i = 0; // loop forever
    }
    onStep?.(i);
    const a = new Audio(audioUrl(texts[i]));
    current = a;
    const next = () => {
      if (id !== run) return;
      const last = k + 1 >= total;
      timer = setTimeout(() => step(last ? i + 1 : i, last ? 0 : k + 1), last ? gapMs : repeatGapMs);
    };
    a.onended = next;
    a.onerror = next;
    a.play().catch(() => { if (id === run) stop(); });
  };
  step(0, 0);
}
