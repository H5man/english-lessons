# Разговорный английский

Сайт: https://h5man.github.io/english-lessons/ — одно React-приложение (Vite + React + TypeScript + Tailwind CSS + shadcn/ui, HashRouter).

- `/#/` — сразу открывает последний урок (списка-страницы нет; список тем — в модалке по клику на заголовок урока)
- `/#/lesson/<id>[/phrases|/quiz|/shadowing]` — урок (фразы, упражнения: карточки, выбор, пропуск; shadowing)

Старые адреса `…/<id>.html` остаются рабочими (редиректы в `public/`).

## Как добавить урок

Новый урок = **файл данных в `src/lessons/` + строка в реестре `src/lessons/index.ts` + push** (деплой пойдёт сам через GitHub Actions).
Это делает скрипт — одной командой:

```bash
/workspace/tools/site-add-lesson.sh /workspace/lessons/<ГГГГ-ММ-ДД-slug>/src/lesson.ts
```

Он копирует файл данных в `src/lessons/<id>.ts`, пересобирает реестр, проверяет `npm run build`, делает commit и `git push origin main`, ждёт окончания деплоя.
Если урок на ту же тему (то же `title` или тот же `id`) уже есть — новые фразы дописываются в его файл **без дублей** (дубль = тот же английский текст `en`), новый файл не создаётся.

Формат файла данных (`lesson.ts` из шаблона урока или `.json` с теми же полями; `-` — JSON из stdin):

```ts
import type { Lesson } from "./types";
export const lesson: Lesson = {
  id: "2026-10-26-slug",          // ГГГГ-ММ-ДД-слаг (латиница, цифры, дефис)
  date: "26 октября 2026",
  title: "Название урока",
  phrases: [{ en: "…", ru: "…", ex: "…" }],
  shadowing: [                    // optional, see "Shadowing" below
    { title: "Фразы урока в новых предложениях", lines: [{ en: "…", ru: "…" }] },
    { title: "Диалог: …", lines: [{ who: "Anna", en: "…", ru: "…" }] },
  ],
};
```

Вручную то же самое: положить файл в `src/lessons/`, добавить `import` и элемент массива в `src/lessons/index.ts`, `npm run build`, commit, push.

## Shadowing

Optional field `shadowing` on a lesson (`src/lessons/types.ts`):

```ts
type ShadowLine = { who?: string; en: string; ru?: string };   // who: speaker label (not voiced), ru: translation
type ShadowSection = { title: string; lines: ShadowLine[] };
type Lesson = { id; date; title; phrases: Phrase[]; shadowing?: ShadowSection[] };
```

- Content rule: shadowing lines are **new** sentences built with the lesson's phrases; they must not repeat
  any phrase `en` or example `ex`. Typical lesson: one section of 6–8 phrase drills and one connected
  dialogue/monologue of 6–8 lines (~30–45 s).
- Audio: `scripts/voice.py` voices every `en` (phrases, examples and shadowing lines) once with
  `en-GB-RyanNeural`, rate `-10%`, into `public/audio/<slug>.mp3`. Nothing is repeated inside a file.
- UI (`src/components/Shadowing.tsx`, tab "Shadowing", shown only when the lesson has shadowing):
  the text of every line, a play button per line, "Всё подряд" per section (plays lines in order with a
  1.2 s pause; the current line is highlighted), a repeat selector 1× / 2× / 3× / ∞ (each sentence N times;
  ∞ loops the line or the whole section until stopped), and a "Перевод" toggle that shows `ru`.
- Merging (`scripts/add-lesson.py`, used by `site-add-lesson.sh`): for an existing lesson, a section with
  the same title gets the new lines appended, other sections are appended as new ones; a line is skipped
  if its `en` already exists in the lesson's shadowing or equals a phrase `en`/`ex`. `phrases` may be empty
  when only shadowing is being added. Use a distinct title for each new dialogue (e.g. "Диалог: релиз")
  so dialogues are not glued together. The lesson file is re-rendered from the merged data.

## Разработка

```bash
npm ci
npm run dev      # локально
npm run build    # tsc + vite build → dist/
```

Деплой: `.github/workflows/deploy.yml` (npm ci → npm run build → upload-pages-artifact → deploy-pages), Pages: источник «GitHub Actions».
