// Единственный файл с содержимым урока. Остальной код от темы не зависит.
import type { Lesson } from "./types";

export const lesson: Lesson = {
  id: "2026-10-31-technical-interview",
  date: "31 октября 2026",
  title: "Технические вопросы на собеседовании",
  phrases: [
    { en: "Let me think out loud.", ru: "Давайте я порассуждаю вслух.", ex: "Let me think out loud for a second." },
    { en: "Just to clarify, …", ru: "Просто чтобы уточнить…", ex: "Just to clarify, is the input always sorted?" },
    { en: "Can I assume that…?", ru: "Могу ли я предположить, что…?", ex: "Can I assume that the list fits in memory?" },
    { en: "My first approach would be…", ru: "Мой первый подход был бы…", ex: "My first approach would be to use a hash map." },
    { en: "The trade-off here is…", ru: "Компромисс здесь в том, что…", ex: "The trade-off here is speed versus memory." },
    { en: "In terms of time complexity, …", ru: "С точки зрения временной сложности…", ex: "In terms of time complexity, the loop is linear." },
    { en: "It depends on the use case.", ru: "Это зависит от сценария использования.", ex: "Should we use SQL or NoSQL? It depends on the use case." },
    { en: "I'd start with a simple solution and then optimise it.", ru: "Я бы начала с простого решения, а потом оптимизировала его.", ex: "Since time is limited, I'd start with a simple solution and then optimise it." },
    { en: "One edge case is…", ru: "Один из граничных случаев…", ex: "One edge case is an empty array." },
    { en: "To scale this, I would…", ru: "Чтобы это масштабировать, я бы…", ex: "To scale this, I would move heavy jobs to a queue." },
    { en: "I haven't worked with it directly, but…", ru: "Я не работала с этим напрямую, но…", ex: "I haven't worked with Kafka directly, but I know the main concepts." },
    { en: "If I remember correctly, …", ru: "Если я правильно помню…", ex: "If I remember correctly, indexes slow down writes a little." },
    { en: "Let me walk you through my code.", ru: "Давайте я проведу вас по своему коду.", ex: "Let me walk you through my code, starting with the main function." },
    { en: "The bottleneck would be…", ru: "Узким местом будет…", ex: "The bottleneck would be the database." },
    { en: "I'd go with … because…", ru: "Я бы выбрала … потому что…", ex: "I'd go with PostgreSQL because we need transactions." },
    { en: "Does that answer your question?", ru: "Это отвечает на ваш вопрос?", ex: "So that's my approach. Does that answer your question?" },
  ],
  shadowing: [
    {
      title: "Фразы урока в новых предложениях",
      lines: [
        { en: "Let me think out loud about the data model.", ru: "Давайте я порассуждаю вслух о модели данных." },
        { en: "Just to clarify, how many requests per second do we expect?", ru: "Просто чтобы уточнить: сколько запросов в секунду мы ожидаем?" },
        { en: "Can I assume that the timestamps are in UTC?", ru: "Могу ли я предположить, что время указано в UTC?" },
        { en: "One edge case is a user with no orders.", ru: "Один из граничных случаев — пользователь без заказов." },
        { en: "The bottleneck would be the image processing step.", ru: "Узким местом будет этап обработки изображений." },
        { en: "I'd go with Redis because we need fast reads.", ru: "Я бы выбрала Redis, потому что нам нужно быстрое чтение." },
        { en: "I haven't worked with Go directly, but I'm a fast learner.", ru: "Я не работала с Go напрямую, но я быстро учусь." },
        { en: "If I remember correctly, this sort is stable.", ru: "Если я правильно помню, эта сортировка устойчивая." },
      ],
    },
    {
      title: "Диалог: сервис коротких ссылок",
      lines: [
        { who: "Interviewer", en: "How would you design a URL shortener?", ru: "Как бы вы спроектировали сервис коротких ссылок?" },
        { who: "Candidate", en: "Good question. How many links do we create per day?", ru: "Хороший вопрос. Сколько ссылок мы создаём в день?" },
        { who: "Interviewer", en: "Let's say about ten million.", ru: "Скажем, около десяти миллионов." },
        { who: "Candidate", en: "Then my first approach would be a simple key-value store.", ru: "Тогда мой первый подход — простое хранилище ключ-значение." },
        { who: "Interviewer", en: "What about popular links that everyone clicks?", ru: "А как быть с популярными ссылками, по которым кликают все?" },
        { who: "Candidate", en: "I'd put a cache in front of the database for those.", ru: "Для них я бы поставила кэш перед базой данных." },
        { who: "Interviewer", en: "And what's the main risk here?", ru: "А какой здесь главный риск?" },
        { who: "Candidate", en: "Collisions, so I'd generate the short IDs very carefully.", ru: "Коллизии, поэтому я бы очень аккуратно генерировала короткие ID." },
      ],
    },
  ],
};
