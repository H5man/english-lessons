export type Phrase = { en: string; ru: string; ex: string };
/** One shadowing sentence: `en` is voiced (public/audio/<slug>.mp3), `who` is an optional speaker label, `ru` an optional translation. */
export type ShadowLine = { who?: string; en: string; ru?: string };
/** A shadowing block: phrase drills or a short connected dialogue/monologue. Each line is voiced once; repeats happen in the UI. */
export type ShadowSection = { title: string; lines: ShadowLine[] };
export type Lesson = { id: string; date: string; title: string; phrases: Phrase[]; shadowing?: ShadowSection[] };
