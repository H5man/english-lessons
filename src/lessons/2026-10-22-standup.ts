// Единственный файл с содержимым урока. Остальной код от темы не зависит.
import type { Lesson } from "./types";

export const lesson: Lesson = {
  id: "2026-10-22-standup",
  date: "22 октября 2026",
  title: "Ежедневный стендап",
  phrases: [
    { en: "Yesterday I wrapped up…", ru: "Вчера я закончил…", ex: "Yesterday I wrapped up the caching task." },
    { en: "Today I'm going to focus on…", ru: "Сегодня я займусь…", ex: "Today I'm going to focus on the payment API integration." },
    { en: "Today I'll be working on…", ru: "Сегодня я буду работать над…", ex: "Today I'll be working on refactoring the API on the backend side." },
    { en: "I'm blocked on…", ru: "У меня блокер: …", ex: "I'm blocked on access to the staging database." },
    { en: "It's taking longer than expected", ru: "Это занимает больше времени, чем я думал", ex: "The migration is taking longer than expected." },
    { en: "Could someone give me a hand with…?", ru: "Может кто-нибудь помочь с…?", ex: "Could someone give me a hand with the CI pipeline?" },
    { en: "No blockers on my side", ru: "С моей стороны блокеров нет", ex: "That's it from me, no blockers on my side." },
  ],
};
