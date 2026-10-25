// Единственный файл с содержимым урока. Остальной код от темы не зависит.
import type { Lesson } from "./types";

export const lesson: Lesson = {
  id: "2026-10-23-tech-decision",
  date: "23 октября 2026",
  title: "Объяснить техническое решение",
  phrases: [
    { en: "We went with X because…", ru: "Мы выбрали X, потому что…", ex: "We went with PostgreSQL because we needed strong consistency." },
    { en: "The main reason is that…", ru: "Главная причина в том, что…", ex: "The main reason is that it's easier to scale later." },
    { en: "The trade-off is that…", ru: "Компромисс в том, что…", ex: "The trade-off is that the first release will take a bit longer." },
    { en: "We considered X, but…", ru: "Мы рассматривали X, но…", ex: "We considered Redis, but it didn't fit our use case." },
    { en: "In the long run, …", ru: "В долгосрочной перспективе…", ex: "In the long run, this will save us a lot of maintenance." },
    { en: "The main risk here is…", ru: "Главный риск здесь…", ex: "The main risk here is the data migration, so we'll do it in small steps." },
  ],
};
