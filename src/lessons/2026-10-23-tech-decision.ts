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
  shadowing: [
    {
      title: "Фразы урока в новых предложениях",
      lines: [
        { en: "We went with React because the whole team knows it well.", ru: "Мы выбрали React, потому что вся команда хорошо его знает." },
        { en: "The main reason is that it saves us time on testing.", ru: "Главная причина в том, что это экономит нам время на тестировании." },
        { en: "The trade-off is that we'll need a bit more memory on the server.", ru: "Минус в том, что серверу понадобится чуть больше памяти." },
        { en: "We considered microservices, but they were too complex for a small team.", ru: "Мы рассматривали микросервисы, но для маленькой команды это слишком сложно." },
        { en: "In the long run, a shared library will reduce duplicate code.", ru: "В долгосрочной перспективе общая библиотека сократит дублирование кода." },
        { en: "The main risk here is that the vendor might change their pricing.", ru: "Главный риск в том, что поставщик может изменить цены." },
      ],
    },
    {
      title: "Монолог: почему мы выбрали эту базу данных",
      lines: [
        { en: "So, let me explain why we picked this database.", ru: "Итак, давайте объясню, почему мы выбрали эту базу данных." },
        { en: "We considered MongoDB, but our data is very relational.", ru: "Мы рассматривали MongoDB, но наши данные сильно связаны между собой." },
        { en: "We went with Postgres because it handles complex queries really well.", ru: "Мы выбрали Postgres, потому что он отлично справляется со сложными запросами." },
        { en: "The main reason is that our reports need a lot of joins.", ru: "Главная причина в том, что нашим отчётам нужно много джойнов." },
        { en: "The trade-off is that schema changes need more planning.", ru: "Минус в том, что изменения схемы требуют больше планирования." },
        { en: "The main risk here is moving the old data without downtime.", ru: "Главный риск — перенести старые данные без простоя." },
        { en: "But in the long run, I'm sure it'll pay off.", ru: "Но в долгосрочной перспективе, уверена, это окупится." },
      ],
    },
  ],
};
