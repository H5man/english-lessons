// Единственный файл с содержимым урока. Остальной код от темы не зависит.
import type { Lesson } from "./types";

export const lesson: Lesson = {
  id: "2026-10-29-small-talk",
  date: "29 октября 2026",
  title: "Small talk на созвонах",
  phrases: [
    { en: "How's your week going?", ru: "Как проходит ваша неделя?", ex: "Hi Tom! How's your week going so far?" },
    { en: "It's been a busy week.", ru: "Неделя выдалась насыщенной.", ex: "Honestly, it's been a busy week with the release." },
    { en: "Any plans for the weekend?", ru: "Есть планы на выходные?", ex: "Any plans for the weekend, or just some rest?" },
    { en: "How's the weather over there?", ru: "Какая у вас там погода?", ex: "It's raining here again. How's the weather over there?" },
    { en: "That sounds like fun!", ru: "Звучит здорово!", ex: "A hiking trip? That sounds like fun!" },
    { en: "Anyway, shall we get started?", ru: "Ну что, начнём?", ex: "Everyone's here now. Anyway, shall we get started?" },
    { en: "Good to see you again.", ru: "Рада снова вас видеть.", ex: "Hi Anna, good to see you again." },
    { en: "Not too bad, thanks. And you?", ru: "Неплохо, спасибо. А у вас?", ex: "Not too bad, thanks. And you? Busy as usual?" },
    { en: "Can you hear me okay?", ru: "Вы меня хорошо слышите?", ex: "I've just switched headphones. Can you hear me okay?" },
    { en: "Sorry, you cut out for a second.", ru: "Извините, вас на секунду не было слышно.", ex: "Sorry, you cut out for a second. Could you repeat that?" },
    { en: "Let's give it another minute for the others to join.", ru: "Давайте подождём ещё минуту, пока подключатся остальные.", ex: "Let's give it another minute for the others to join, then we'll start." },
    { en: "Did you do anything fun over the weekend?", ru: "Делали что-нибудь интересное на выходных?", ex: "Did you do anything fun over the weekend, or was it a quiet one?" },
    { en: "Oh, really? How was it?", ru: "Правда? И как всё прошло?", ex: "You went to the concert? Oh, really? How was it?" },
    { en: "I've been meaning to try that.", ru: "Я давно собираюсь это попробовать.", ex: "Paddleboarding? I've been meaning to try that." },
    { en: "What time is it over there?", ru: "Сколько у вас сейчас времени?", ex: "It's evening here. What time is it over there?" },
    { en: "Have a great weekend!", ru: "Хороших выходных!", ex: "Thanks, everyone. Have a great weekend!" },
  ],
  shadowing: [
    {
      title: "Фразы урока в новых предложениях",
      lines: [
        { en: "Hi Sam! How's your week going? Still busy with the mobile app?", ru: "Привет, Сэм! Как проходит неделя? Всё ещё занят мобильным приложением?" },
        { en: "Not too bad, thanks. And you? Did you get some rest?", ru: "Неплохо, спасибо. А у тебя? Удалось отдохнуть?" },
        { en: "It's been a busy week, lots of meetings and not much coding.", ru: "Неделя выдалась насыщенной: много встреч и мало кода." },
        { en: "How's the weather over there? I heard it's freezing.", ru: "Как у вас там погода? Слышала, у вас морозы." },
        { en: "So, did you do anything fun over the weekend with the kids?", ru: "Ну что, делали что-нибудь интересное с детьми на выходных?" },
        { en: "A cooking class? That sounds like fun!", ru: "Кулинарный мастер-класс? Звучит здорово!" },
        { en: "Sorry, you cut out again. Can you hear me okay now?", ru: "Извини, ты опять пропал. Сейчас меня хорошо слышно?" },
        { en: "Right, Anna's here too. Anyway, shall we get started with the demo?", ru: "Так, Анна тоже здесь. Ну что, начнём с демо?" },
      ],
    },
    {
      title: "Диалог: первые минуты созвона",
      lines: [
        { who: "Tom", en: "Hi Maria, good to see you again! Can you hear me okay?", ru: "Привет, Мария, рад снова тебя видеть! Хорошо меня слышно?" },
        { who: "Maria", en: "Yes, loud and clear. How's your week going?", ru: "Да, отлично. Как проходит твоя неделя?" },
        { who: "Tom", en: "Not too bad, thanks. It's been a busy week, but the release went well.", ru: "Неплохо, спасибо. Неделя была насыщенной, но релиз прошёл хорошо." },
        { who: "Maria", en: "Oh, really? Congrats! Any plans for the weekend?", ru: "Правда? Поздравляю! Есть планы на выходные?" },
        { who: "Tom", en: "We're going to the mountains. I've been meaning to try skiing for years.", ru: "Едем в горы. Я уже много лет собираюсь попробовать лыжи." },
        { who: "Maria", en: "That sounds like fun! What time is it over there, by the way?", ru: "Звучит здорово! Кстати, который у вас там час?" },
        { who: "Tom", en: "Almost six. Let's give it another minute for the others to join.", ru: "Почти шесть. Давай подождём ещё минуту, пока подключатся остальные." },
        { who: "Maria", en: "Sure. Oh, here they are. Anyway, shall we get started?", ru: "Конечно. О, вот и они. Ну что, начнём?" },
      ],
    },
  ],
};
