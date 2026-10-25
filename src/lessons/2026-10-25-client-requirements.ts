// Единственный файл с содержимым урока. Остальной код от темы не зависит.
import type { Lesson } from "./types";

export const lesson: Lesson = {
  id: "2026-10-25-client-requirements",
  date: "25 октября 2026",
  title: "Требования и оценки с клиентом",
  phrases: [
    { en: "Just to make sure I understand, …", ru: "Чтобы убедиться, что я правильно понял, …", ex: "Just to make sure I understand, you need the export feature within three weeks." },
    { en: "Could you walk me through…?", ru: "Не могли бы вы подробно рассказать о…?", ex: "Could you walk me through the details of how the report should look?" },
    { en: "Now that the big picture is clear, let's get into the details.", ru: "Раз общая картина ясна, давайте перейдём к деталям.", ex: "Now that the big picture is clear, let's get into the details of the export." },
    { en: "As for the details, …", ru: "Что касается деталей, …", ex: "As for the details, we'd need to support PDF and Excel." },
    { en: "In terms of scope, …", ru: "По объёму работ…", ex: "In terms of scope, the first version would only include PDF." },
    { en: "Breaking it down, …", ru: "Если разбить на части…", ex: "Breaking it down, there are three parts: UI, export service and testing." },
    { en: "A rough estimate would be…", ru: "Примерная оценка…", ex: "A rough estimate would be about two weeks." },
    { en: "Off the top of my head, a ballpark figure would be…", ru: "Навскидку, примерная оценка…", ex: "Off the top of my head, a ballpark figure would be two to three weeks." },
    { en: "That depends on…", ru: "Это зависит от…", ex: "That depends on how many integrations we need." },
    { en: "Realistically, we can deliver… by…", ru: "Реалистично, мы сможем сдать… к…", ex: "Realistically, we can deliver the first version by mid-November." },
    { en: "Is there any flexibility on the deadline?", ru: "Есть ли гибкость по срокам?", ex: "Is there any flexibility on the deadline, or is the end of the month fixed?" },
    { en: "The goal is to have it ready in…", ru: "Цель — сделать к…", ex: "The goal is to have it ready in three weeks." },
    { en: "That's out of scope for the first version, but…", ru: "Это не входит в первую версию, но…", ex: "That's out of scope for the first version, but we can add it in the next release." },
    { en: "Is that a must-have or a nice-to-have?", ru: "Это обязательно или просто было бы неплохо?", ex: "Is that a must-have or a nice-to-have for the launch?" },
    { en: "We went with this approach because…", ru: "Мы выбрали этот подход, потому что…", ex: "We went with this approach because it's simpler to maintain." },
    { en: "The trade-off is…", ru: "Компромисс в том, что…", ex: "The trade-off is that the first load is a bit slower." },
    { en: "The main risk here is…", ru: "Главный риск здесь…", ex: "The main risk here is the third-party integration." },
    { en: "I'll double-check that and get back to you", ru: "Я уточню и вернусь к вам", ex: "I'll double-check that with the team and get back to you tomorrow." },
    { en: "I'll get back to you with…", ru: "Я вернусь к вам с…", ex: "I'll get back to you with a detailed estimate by Friday." },
    { en: "I'll need to check with the team before I commit to a date.", ru: "Мне нужно уточнить у команды, прежде чем назвать срок.", ex: "It sounds doable, but I'll need to check with the team before I commit to a date." },
  ],
};
