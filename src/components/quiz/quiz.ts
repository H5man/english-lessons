import type { Phrase } from "@/lessons/types";

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** До 4 вариантов: правильный + дистракторы из других фраз урока. */
export function buildOptions(all: Phrase[], correct: Phrase, n = 4): Phrase[] {
  const others = shuffle(all.filter((p) => p !== correct));
  return shuffle([correct, ...others.slice(0, n - 1)]);
}

export type Choice = { prompt: Phrase; options: Phrase[] };
export function buildChoice(all: Phrase[]): Choice[] {
  return shuffle(all).map((p) => ({ prompt: p, options: buildOptions(all, p) }));
}

// ---- «Пропуск»: прячем в примере ключевую фразу ----
const norm = (s: string) => s.replace(/[’‘]/g, "'");
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const trimEdge = (s: string) => s.replace(/^[\s,.;:!?…]+|[\s,.;:!?…]+$/g, "");

export type Piece = { text: string; hidden: boolean };

function findRange(ex: string, seg: string, from: number): [number, number] | null {
  const re = new RegExp("(^|[^\\w'])(" + esc(seg) + ")(?![\\w])", "i");
  const m = re.exec(ex.slice(from));
  if (!m) return null;
  const start = from + m.index + m[1].length;
  return [start, start + m[2].length];
}

/** Возвращает кусочки примера; hidden=true — место пропуска. null, если фразу не найти. */
export function makeGap(p: Phrase): Piece[] | null {
  const ex = norm(p.ex);
  const segs = norm(p.en).split("…").map(trimEdge).filter((s) => s.length > 0);
  const ranges: [number, number][] = [];
  let cursor = 0;
  for (const s of segs) {
    const r = findRange(ex, s, cursor);
    if (r) { ranges.push(r); cursor = r[1]; }
  }
  if (ranges.length === 0) {
    // запасной вариант: самый длинный непрерывный отрезок слов фразы, который есть в примере
    const words = norm(p.en).replace(/…/g, " ").split(/\s+/).map(trimEdge).filter(Boolean);
    let best: [number, number] | null = null;
    for (let i = 0; i < words.length; i++)
      for (let j = words.length; j > i; j--) {
        const r = findRange(ex, words.slice(i, j).join(" "), 0);
        if (r && (!best || r[1] - r[0] > best[1] - best[0])) best = r;
      }
    if (!best || best[1] - best[0] < 6) return null;
    ranges.push(best);
  }
  // склеиваем, если между пропусками почти ничего нет
  const pieces: Piece[] = [];
  let pos = 0;
  for (const [a, b] of ranges) {
    if (a > pos) pieces.push({ text: p.ex.slice(pos, a), hidden: false });
    pieces.push({ text: p.ex.slice(a, b), hidden: true });
    pos = b;
  }
  if (pos < p.ex.length) pieces.push({ text: p.ex.slice(pos), hidden: false });
  return pieces;
}

export type Gap = { prompt: Phrase; pieces: Piece[]; options: Phrase[] };
export function buildGaps(all: Phrase[]): Gap[] {
  const out: Gap[] = [];
  for (const p of shuffle(all)) {
    const pieces = makeGap(p);
    if (pieces) out.push({ prompt: p, pieces, options: buildOptions(all, p) });
  }
  return out;
}
