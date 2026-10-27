// Единственный файл с содержимым урока. Остальной код от темы не зависит.
import type { Lesson } from "./types";

export const lesson: Lesson = {
  id: "2026-10-27-code-review",
  date: "27 октября 2026",
  title: "Обсуждение код-ревью",
  phrases: [
    { en: "Have you considered…?", ru: "Вы не думали о…?", ex: "Have you considered using a map instead of nested loops?" },
    { en: "I'd suggest…", ru: "Я бы предложила…", ex: "I'd suggest moving this logic into a separate function." },
    { en: "Fair point, but…", ru: "Справедливо, но…", ex: "Fair point, but this adds one more dependency." },
    { en: "What's the reasoning behind…?", ru: "Чем обосновано…?", ex: "What's the reasoning behind this extra cache layer?" },
    { en: "Could you walk me through…?", ru: "Не могли бы вы пошагово объяснить…?", ex: "Could you walk me through how this handles retries?" },
    { en: "This might cause issues with…", ru: "Это может вызвать проблемы с…", ex: "This might cause issues with concurrent requests." },
    { en: "Nice catch!", ru: "Хорошо подмечено!", ex: "Nice catch! I missed that null check." },
    { en: "I see where you're coming from", ru: "Понимаю, почему вы так считаете", ex: "I see where you're coming from, but I'd keep it simple for now." },
    { en: "It's a minor thing, but…", ru: "Это мелочь, но…", ex: "It's a minor thing, but the variable name is a bit confusing." },
    { en: "This is just a nitpick", ru: "Это просто придирка (можно не исправлять)", ex: "This is just a nitpick, feel free to ignore it." },
    { en: "Would it make sense to…?", ru: "Может, имеет смысл…?", ex: "Would it make sense to add a test for an empty list?" },
    { en: "I'm not sure this is the right approach", ru: "Я не уверена, что это правильный подход", ex: "Honestly, I'm not sure this is the right approach for large files." },
    { en: "Let's take this offline", ru: "Давайте обсудим это отдельно", ex: "This thread is getting long, so let's take this offline." },
    { en: "I've addressed your comments", ru: "Я учла ваши комментарии", ex: "Thanks for the review, I've addressed your comments." },
    { en: "Good point, I'll fix that", ru: "Хорошее замечание, исправлю", ex: "Good point, I'll fix that in the next commit." },
    { en: "Looks good to me", ru: "Выглядит хорошо, одобряю (LGTM)", ex: "Looks good to me, just one small comment." },
    { en: "Can we keep this out of scope for now?", ru: "Можем пока оставить это за рамками задачи?", ex: "Can we keep this out of scope for now and open a separate ticket?" },
    { en: "I'd rather not block the PR over this", ru: "Не хотелось бы блокировать PR из-за этого", ex: "I'd rather not block the PR over this, let's fix it in a follow-up." },
  ],
};
