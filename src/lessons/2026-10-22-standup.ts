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
  shadowing: [
    {
      title: "Фразы урока в новых предложениях",
      lines: [
        { en: "Yesterday I wrapped up the tests for the login page.", ru: "Вчера я закончила тесты для страницы входа." },
        { en: "Today I'm going to focus on the search bug.", ru: "Сегодня я сосредоточусь на баге в поиске." },
        { en: "Today I'll be working on the new settings screen.", ru: "Сегодня я буду работать над новым экраном настроек." },
        { en: "I'm blocked on a code review from the backend team.", ru: "Меня блокирует код-ревью от бэкенд-команды." },
        { en: "The data import is taking longer than expected.", ru: "Импорт данных занимает больше времени, чем ожидалось." },
        { en: "Could someone give me a hand with the Docker setup?", ru: "Может кто-нибудь помочь мне с настройкой Docker?" },
        { en: "All good here, no blockers on my side.", ru: "У меня всё хорошо, блокеров нет." },
      ],
    },
    {
      title: "Монолог: апдейт на стендапе",
      lines: [
        { en: "Morning, everyone. I'll go first.", ru: "Всем доброе утро. Я начну." },
        { en: "Yesterday I wrapped up the bug fixes for the mobile app.", ru: "Вчера я закончила исправлять баги в мобильном приложении." },
        { en: "Today I'm going to focus on the notification service.", ru: "Сегодня я сосредоточусь на сервисе уведомлений." },
        { en: "The email templates are taking longer than expected, though.", ru: "Правда, шаблоны писем занимают больше времени, чем ожидалось." },
        { en: "I'm also blocked on the API keys for the new provider.", ru: "Ещё меня блокируют API-ключи для нового провайдера." },
        { en: "Could someone from DevOps give me a hand with that after the call?", ru: "Может кто-нибудь из DevOps помочь мне с этим после созвона?" },
        { en: "Other than that, I'm on track. Over to you, Alex.", ru: "В остальном всё по плану. Алекс, твоя очередь." },
      ],
    },
  ],
};
