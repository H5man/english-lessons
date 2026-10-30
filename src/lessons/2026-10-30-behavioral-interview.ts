// Единственный файл с содержимым урока. Остальной код от темы не зависит.
import type { Lesson } from "./types";

export const lesson: Lesson = {
  id: "2026-10-30-behavioral-interview",
  date: "30 октября 2026",
  title: "Поведенческие вопросы на собеседовании",
  phrases: [
    { en: "Tell me about a time when…", ru: "Расскажите о случае, когда…", ex: "Tell me about a time when you had to meet a tight deadline." },
    { en: "The situation was…", ru: "Ситуация была такая…", ex: "The situation was that our main client changed the requirements a week before launch." },
    { en: "My task was to…", ru: "Моей задачей было…", ex: "My task was to migrate the payment service without any downtime." },
    { en: "What I did was…", ru: "Я сделала вот что…", ex: "What I did was split the work into small releases." },
    { en: "As a result, …", ru: "В результате…", ex: "As a result, we cut the response time by forty percent." },
    { en: "I took ownership of…", ru: "Я взяла на себя ответственность за…", ex: "I took ownership of the release process for our team." },
    { en: "Looking back, I would…", ru: "Оглядываясь назад, я бы…", ex: "Looking back, I would involve QA much earlier." },
    { en: "The biggest lesson I learned was…", ru: "Главный урок, который я вынесла…", ex: "The biggest lesson I learned was to ask questions early." },
    { en: "We had a disagreement about…", ru: "У нас было разногласие по поводу…", ex: "We had a disagreement about which framework to use." },
    { en: "I tried to understand their point of view.", ru: "Я постаралась понять их точку зрения.", ex: "Before arguing, I tried to understand their point of view." },
    { en: "We found a compromise.", ru: "Мы нашли компромисс.", ex: "In the end, we found a compromise and shipped both features later." },
    { en: "I made a mistake when…", ru: "Я ошиблась, когда…", ex: "I made a mistake when I deployed on a Friday evening." },
    { en: "I owned up to it.", ru: "Я признала свою ошибку.", ex: "I owned up to it and told my manager right away." },
    { en: "Under a lot of pressure", ru: "Под сильным давлением", ex: "We were under a lot of pressure because of the investor demo." },
    { en: "I'm most proud of…", ru: "Больше всего я горжусь…", ex: "I'm most proud of the monitoring system I built from scratch." },
    { en: "It taught me how to…", ru: "Это научило меня…", ex: "It taught me how to prioritise when everything is urgent." },
  ],
  shadowing: [
    {
      title: "Фразы урока в новых предложениях",
      lines: [
        { en: "Tell me about a time when you disagreed with your manager.", ru: "Расскажите о случае, когда вы не согласились с руководителем." },
        { en: "The situation was that our tests kept failing at night.", ru: "Ситуация была такая: наши тесты постоянно падали ночью." },
        { en: "My task was to find the cause in two days.", ru: "Моей задачей было найти причину за два дня." },
        { en: "What I did was add logging to every step.", ru: "Я сделала вот что: добавила логи на каждый шаг." },
        { en: "As a result, the build became stable again.", ru: "В результате сборка снова стала стабильной." },
        { en: "I owned up to it in the retro meeting.", ru: "Я признала свою ошибку на ретро." },
        { en: "Looking back, I would write the docs first.", ru: "Оглядываясь назад, я бы сначала написала документацию." },
        { en: "It taught me how to say no politely.", ru: "Это научило меня вежливо отказывать." },
      ],
    },
    {
      title: "Монолог: история по схеме STAR",
      lines: [
        { en: "Last year, our app started crashing for some users.", ru: "В прошлом году наше приложение начало падать у части пользователей." },
        { en: "Nobody knew why, and the client was getting nervous.", ru: "Никто не знал почему, и клиент начинал нервничать." },
        { en: "I volunteered to lead the investigation.", ru: "Я вызвалась руководить расследованием." },
        { en: "First, I collected crash reports and grouped them by device.", ru: "Сначала я собрала отчёты о падениях и сгруппировала их по устройствам." },
        { en: "It turned out that one library had a memory leak.", ru: "Оказалось, что в одной библиотеке была утечка памяти." },
        { en: "We replaced it and released a fix within a week.", ru: "Мы заменили её и выпустили исправление за неделю." },
        { en: "Crashes dropped by ninety percent, and the client was happy.", ru: "Падений стало на девяносто процентов меньше, и клиент остался доволен." },
      ],
    },
  ],
};
