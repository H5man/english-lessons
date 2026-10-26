# Разговорный английский

Сайт: https://h5man.github.io/english-lessons/ — одно React-приложение (Vite + React + TypeScript + Tailwind CSS + shadcn/ui, HashRouter).

- `/#/` — список уроков
- `/#/lesson/<id>[/phrases|/quiz]` — урок (фразы и упражнения: карточки, выбор, пропуск)

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
};
```

Вручную то же самое: положить файл в `src/lessons/`, добавить `import` и элемент массива в `src/lessons/index.ts`, `npm run build`, commit, push.

## Разработка

```bash
npm ci
npm run dev      # локально
npm run build    # tsc + vite build → dist/
```

Деплой: `.github/workflows/deploy.yml` (npm ci → npm run build → upload-pages-artifact → deploy-pages), Pages: источник «GitHub Actions».
