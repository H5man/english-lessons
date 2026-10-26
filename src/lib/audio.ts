import { audioSlugs } from "@/audio-manifest";

// Должно совпадать с slug() в scripts/voice.py
export const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const hasAudio = (t: string) => audioSlugs.has(slug(t));
export const audioUrl = (t: string) => `${import.meta.env.BASE_URL}audio/${slug(t)}.mp3`;

let current: HTMLAudioElement | null = null;
export function play(t: string) {
  current?.pause();
  current = new Audio(audioUrl(t));
  void current.play();
}
