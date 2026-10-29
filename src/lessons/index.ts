// Реестр уроков. Новый урок = файл данных в этой папке + строка import и строка в массиве ниже.
// Файл генерирует scripts/add-lesson.py (см. README.md); можно править и руками.
import type { Lesson } from "./types";
import { lesson as l_2026_10_29_small_talk } from "./2026-10-29-small-talk";
import { lesson as l_2026_10_27_code_review } from "./2026-10-27-code-review";
import { lesson as l_2026_10_25_client_requirements } from "./2026-10-25-client-requirements";
import { lesson as l_2026_10_23_tech_decision } from "./2026-10-23-tech-decision";
import { lesson as l_2026_10_22_standup } from "./2026-10-22-standup";

export type { Lesson, Phrase, ShadowLine, ShadowSection } from "./types";

// Порядок = порядок в списке на главной (новые сверху).
export const lessons: Lesson[] = [
  l_2026_10_29_small_talk,
  l_2026_10_27_code_review,
  l_2026_10_25_client_requirements,
  l_2026_10_23_tech_decision,
  l_2026_10_22_standup,
];

export const getLesson = (id: string) => lessons.find((l) => l.id === id);
