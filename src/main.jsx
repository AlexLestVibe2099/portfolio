import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://your-portfolio.vercel.app';
const YM_COUNTER_ID = import.meta.env.VITE_YM_COUNTER_ID || '';
const LEGAL_BOT_URL = import.meta.env.VITE_LEGAL_BOT_URL || 'https://t.me/';
const BARBERSHOP_BOT_URL =
  import.meta.env.VITE_BARBERSHOP_BOT_URL || 'https://t.me/PriemZapisi_online_bot';

const LEAD_TEMPLATE =
  'Здравствуйте! Хочу обсудить проект.\n\nЗадача: \nДля кого сайт/бот: \nСрок: \nБюджет: ';

const portfolio = {
  brand: 'Webstack Lab',
  contact: {
    email: 'Alexander.brusnikin2016@yandex.ru',
    telegram: '@AlexLest2099',
    telegramHandle: 'AlexLest2099',
    telegramUrl: `https://t.me/AlexLest2099?text=${encodeURIComponent(LEAD_TEMPLATE)}`,
    mailUrl: `https://mail.yandex.ru/compose?mailto=${encodeURIComponent(
      'Alexander.brusnikin2016@yandex.ru'
    )}&subject=${encodeURIComponent('Заявка на проект — Webstack Lab')}&body=${encodeURIComponent(LEAD_TEMPLATE)}`,
    mailtoUrl: `mailto:Alexander.brusnikin2016@yandex.ru?subject=${encodeURIComponent(
      'Заявка на проект — Webstack Lab'
    )}&body=${encodeURIComponent(LEAD_TEMPLATE)}`,
  },
  stats: [
    { value: '4+', label: 'готовых кейса в портфолио' },
    { value: '3–7 дней', label: 'типичный срок запуска' },
    { value: 'от 5 000 ₽', label: 'стартовый проект под ключ' },
  ],
  services: [
    {
      id: 'landing',
      title: 'Лендинг',
      price: 'от 5 000 ₽',
      summary: 'Одностраничник: что вы делаете, сколько стоит, как связаться.',
      features: ['Мобильная версия', 'Понятная структура', 'Готово к публикации'],
      cta: 'Заказать лендинг',
    },
    {
      id: 'bot',
      title: 'Telegram-бот',
      price: 'от 8 000 ₽',
      summary: 'Бот задаёт нужные вопросы и присылает вам готовую карточку заявки.',
      features: ['Сценарий вопросов', 'Уведомление вам', 'Простая настройка'],
      cta: 'Заказать бота',
      featured: true,
    },
    {
      id: 'bundle',
      title: 'Лендинг + бот',
      price: 'от 12 000 ₽',
      summary: 'С сайта человек уходит в Telegram и оставляет полную заявку.',
      features: ['Один путь клиента', 'Меньше «написал и пропал»', 'Можно показать как образец'],
      cta: 'Обсудить связку',
    },
  ],
  faq: [
    {
      question: 'Сколько занимает запуск?',
      answer:
        'Простой лендинг или бот — обычно 3–7 дней. Связка «лендинг + бот» — до 10 дней в зависимости от сценария и количества правок.',
    },
    {
      question: 'Что входит в работу?',
      answer:
        'Структура страницы или сценария, интерфейс, адаптив, проверка на мобильных, сборка и ссылка для публикации. Тексты можно передать готовые или собрать вместе на старте.',
    },
    {
      question: 'Нужен ли мне свой хостинг?',
      answer:
        'Для лендинга подойдёт бесплатный хостинг вроде Vercel. Для бота — небольшой облачный сервер; помогу с первичной настройкой и объясню, что где лежит.',
    },
    {
      question: 'Что после сдачи проекта?',
      answer:
        'Передаю доступы, короткую инструкцию и остаюсь на связи по мелким правкам в первые дни после запуска. Доработки и новые функции — отдельно по договорённости.',
    },
    {
      question: 'Можно начать с маленького объёма?',
      answer:
        'Да. Часто логично стартовать с лендинга или простого бота, проверить отклик и потом наращивать сценарий — без лишних затрат на старте.',
    },
  ],
  cases: [
    {
      id: 'telegram-zayavchnik',
      title: 'Telegram-заявочник',
      label: 'Лендинг + сценарий · Northline',
      audience:
        'Для B2B digital-студий и агентств вроде Northline: сайты, боты и интеграции, где заявки приходят из рекламы и переписок.',
      problem:
        'Клиент пишет коротко. Дальше менеджер вручную выясняет задачу, срок и контакт — часть обращений остывает.',
      problemDetail:
        'Обращения размазаны по личкам и комментариям. Услугу, срок и бюджет приходится уточнять вручную — пока собираете контекст, часть лидов уходит.',
      before:
        'Заявки в разных чатах, одни и те же вопросы по кругу, контекст каждый раз собирали заново.',
      work: [
        'Мини-лендинг с оффером связки и переходом в Telegram.',
        'Сценарий Northline: услуга → задача → срок → бюджет → контакт (до 7 шагов).',
        'Готовая карточка заявки вместо сырого «сколько стоит?».',
      ],
      results: [
        'Менеджер отвечает уже по делу, а не уточняет базу.',
        'Меньше круговых переписок до первого нормального разговора.',
        'Проще понять, кому ответить первым.',
      ],
      metrics: [
        { value: '3–5 дней', label: 'от брифа до запуска связки' },
        { value: '3 шага', label: 'лендинг → бот → карточка менеджеру' },
        { value: 'до 7', label: 'шагов в сценарии Northline' },
      ],
      url: 'https://telegram-landing-gamma.vercel.app/',
      tags: ['Лендинг', 'Telegram', 'B2B'],
      productCta: 'Открыть лендинг',
      cardMedia: 'screenshot',
      screenshot: {
        src: '/case-telegram-landing.png',
        alt: 'Скриншот лендинга Telegram-заявочник',
        barLabel: 'telegram-landing-gamma.vercel.app',
      },
      demo: {
        src: '/demo-telegram-zayavchnik.mp4',
        title: 'Telegram-заявочник в работе',
        description:
          'Короткое видео: первый экран лендинга, путь заявки и как выглядит готовый продукт.',
      },
      sections: {
        workTitle: 'Лендинг и сценарий Northline, после которых заявка уже понятна',
        resultsTitle: 'Менеджер видит готовую карточку, а не обрывок переписки',
        sliderEyebrow: '03 / Как работает связка',
        sliderTitle: 'От лендинга до карточки менеджеру — по шагам',
        sliderLayout: 'phones',
      },
      heroVisual: {
        src: '/case-telegram-landing.png',
        alt: 'Лендинг Telegram-заявочника и сценарий заявок Northline',
        cards: [
          {
            position: 'top',
            label: 'Клиент',
            text: 'Northline · digital B2B',
          },
          {
            position: 'bottom',
            label: 'Результат',
            text: 'Карточка заявки менеджеру',
          },
        ],
      },
      preview: 'lead-card',
      gallery: [],
      slides: [
        {
          src: '/case-tg-01-landing.png',
          alt: 'Главный экран лендинга Telegram-заявочник с оффером и переходом в бота',
          title: 'Лендинг',
          description: 'Оффер и переход в Telegram.',
        },
        {
          src: '/case-tg-02-start.png',
          alt: 'Старт сценария Northline: выбор услуги',
          title: 'Старт',
          description: 'Бот Northline начинает с услуги.',
        },
        {
          src: '/case-tg-03-questions.png',
          alt: 'Сценарий Northline: задача, срок, бюджет, контакт',
          title: 'Вопросы',
          description: 'Задача, срок, бюджет, контакт.',
        },
        {
          src: '/case-tg-04-card.png',
          alt: 'Карточка готовой заявки Northline для менеджера',
          title: 'Карточка',
          description: 'Менеджеру — структурированная заявка.',
        },
      ],
    },
    {
      id: 'legal-consult-bot',
      title: 'Бот юридических консультаций',
      label: 'Telegram-бот + AI-ассистент',
      audience:
        'Для юридических фирм и частных юристов: семейное право, трудовые споры, недвижимость, долги, бизнес, наследство.',
      problem:
        'Люди пишут и звонят вразнобой. Юрист тратит время на первичный опрос, часть клиентов не дожидается ответа.',
      problemDetail:
        'Обращения размазаны по звонкам и чатам. Категорию, срочность и контакт приходится уточнять вручную — пока ждёте, часть людей уходит.',
      before:
        'Заявки в звонках и личных чатах. Категорию, срочность и контакт уточняли вручную перед каждой консультацией.',
      work: [
        'Пошаговая запись: категория, ситуация, срочность, документы, связь.',
        'Заявки в базе и уведомление менеджеру с готовой карточкой.',
        'AI «Правовой компас»: отвечает на типовые вопросы и подсказывает, когда записаться.',
      ],
      results: [
        'Клиент получает ориентир сразу.',
        'Заявка приходит с категорией, сутью и контактом.',
        'Все обращения в одном месте.',
      ],
      metrics: [
        { value: '6+', label: 'направлений права в сценарии' },
        { value: '7 шагов', label: 'от категории до готовой заявки' },
        { value: '24/7', label: 'приём обращений без ожидания звонка' },
      ],
      url: LEGAL_BOT_URL,
      tags: ['Telegram-бот', 'AI', 'Supabase'],
      productCta: 'Открыть бота в Telegram',
      cardMedia: 'screenshot',
      screenshot: {
        src: '/case-legal-bot-02-ai.png',
        alt: 'Диалог с ботом юридических консультаций: AI-ассистент отвечает на вопрос клиента',
        barLabel: 'Правовой компас — Telegram',
      },
      demo: null,
      sections: {
        workTitle: 'Бот собирает заявку и отвечает на типовые вопросы',
        resultsTitle: 'Юрист видит готовую карточку, клиент — быстрый ответ',
        sliderEyebrow: '03 / Как работает бот',
        sliderTitle: 'Как выглядит сценарий в Telegram',
        sliderLayout: 'shots',
      },
      heroVisual: {
        src: '/case-legal-bot-hero.png',
        alt: 'Telegram-бот с AI-ассистентом, CRM и аналитикой заявок',
        cards: [
          {
            position: 'top',
            label: 'Стек',
            text: 'Telegram + AI + база заявок',
          },
          {
            position: 'bottom',
            label: 'Фокус',
            text: 'Заявка и ответ в одном чате',
          },
        ],
      },
      gallery: [
        { title: 'Диалог с ботом', type: 'chat' },
        { title: 'Карточка для юриста', type: 'legal-lead-card' },
        { title: 'Путь пользователя', type: 'legal-flow' },
      ],
      slides: [
        {
          src: '/case-legal-bot-01-start.png',
          alt: 'Стартовый экран бота «Правовой компас» с описанием возможностей',
          title: 'Старт',
          description: 'Что умеет бот и как начать.',
        },
        {
          src: '/case-legal-bot-02-ai.png',
          alt: 'AI-ассистент отвечает на вопрос о сделке с недвижимостью',
          title: 'AI-ответ',
          description: 'Вопрос своими словами и ориентир по шагам.',
        },
        {
          src: '/case-legal-bot-03-wizard.png',
          alt: 'Пошаговый сценарий оформления заявки: срочность, документы, контакт и подтверждение',
          title: 'Заявка',
          description: 'Срочность, документы, контакт и проверка.',
        },
        {
          src: '/case-legal-bot-04-lead.png',
          alt: 'Карточка новой заявки у менеджера в Telegram с контактами и командой юристов',
          title: 'Менеджеру',
          description: 'Готовая карточка обращения в Telegram.',
        },
      ],
    },
    {
      id: 'beige-studio-landing',
      title: 'Лендинг для студии маникюра',
      label: 'Одностраничный сайт',
      audience:
        'Для мастеров маникюра, бровей и небольших бьюти-студий, у которых нет своего сайта — запись обычно шла через директ и сторис.',
      problem:
        'Запись через директ и сторис. Нет одного места с ценами, работами и кнопкой «записаться».',
      before:
        'Сайт = только соцсети. Цены — в переписке, портфолио — разрозненные фото, новым клиентам сложно понять услуги.',
      work: [
        'Страница: оффер → мастер → цены → работы → отзывы → запись.',
        'Портфолио сеткой по типам услуг — сразу видно уровень и стиль.',
        'Блок записи с адресом и контактами — кнопка ведёт туда с любого места страницы.',
      ],
      results: [
        'Ответы на вопросы без переписки в директе.',
        'Работы сами «продают» запись.',
        'Удобно с телефона — так и бронируют чаще всего.',
      ],
      metrics: [
        { value: '7 секций', label: 'от знакомства до записи' },
        { value: '100%', label: 'удобно смотреть с телефона' },
        { value: '1 клик', label: 'до контактов студии с любого экрана' },
      ],
      url: '#/beige-studio',
      tags: ['Лендинг', 'Одностраничник', 'Бьюти'],
      productCta: 'Открыть лендинг',
      cardMedia: 'screenshot',
      screenshot: {
        src: '/beige-studio-hero.png',
        alt: 'Мастер наносит гель-лак на ногти клиентки в светлой студии Beige Studio',
        barLabel: 'beige-studio.ru',
      },
      demo: null,
      sections: {
        workTitle: 'Страница отвечает на вопросы без переписки в директе',
        resultsTitle: 'Цены и работы сами подводят к записи',
        sliderEyebrow: '03 / Портфолио',
        sliderTitle: 'Работы студии — по категориям услуг',
      },
      heroVisual: {
        src: '/beige-studio-hero.png',
        alt: 'Мастер наносит гель-лак на ногти клиентки в светлой студии Beige Studio',
        cards: [
          {
            position: 'top',
            label: 'Формат',
            text: 'Одна страница — телефон и компьютер',
          },
          {
            position: 'bottom',
            label: 'Фокус',
            text: 'От услуги до записи в один клик',
          },
        ],
      },
      slides: [
        {
          src: '/beige-studio-nails-1.png',
          alt: 'Маникюр в нюдовом оттенке с эффектом стеклянных ногтей',
          title: 'Glazed-эффект',
          description:
            'Один из самых частых запросов клиентов — полупрозрачное нюдовое покрытие с эффектом «стеклянных» ногтей. В портфолио показано крупным планом, чтобы передать текстуру покрытия.',
        },
        {
          src: '/beige-studio-nails-2.png',
          alt: 'Французский маникюр с тонкой золотой линией',
          title: 'French с акцентом',
          description:
            'Классический french получает современный акцент — тонкая золотая линия на границе улыбки. Такие детали в портфолио помогают клиенту выбрать дизайн ещё до визита.',
        },
        {
          src: '/beige-studio-nails-3.png',
          alt: 'Нюдовый маникюр на двух руках рядом с чашкой кофе',
          title: 'Классический нюд',
          description:
            'Лайфстайл-кадр показывает готовый маникюр в повседневной обстановке — это работает лучше, чем сухое фото на белом фоне, и помогает клиенту представить результат на себе.',
        },
        {
          src: '/beige-studio-brows.png',
          alt: 'Оформленные брови после коррекции и укладки',
          title: 'Оформление бровей',
          description:
            'Отдельная категория портфолио — брови после коррекции и укладки. Крупный план демонстрирует чёткость формы и естественный результат.',
        },
        {
          src: '/beige-studio-lashes.png',
          alt: 'Ресницы после ламинирования крупным планом',
          title: 'Ламинирование ресниц',
          description:
            'Ламинирование — услуга, результат которой сложно передать словами, поэтому в портфолио есть отдельный крупный кадр с макро-деталью ресниц после процедуры.',
        },
      ],
    },
    {
      id: 'barbershop-booking-bot',
      title: 'Бот онлайн-записи для барбершопа',
      label: 'Telegram-бот · онлайн-запись',
      audience:
        'Для барбершопов и парикмахерских, где запись идёт через звонки, директ и личные чаты мастеров.',
      problem:
        'Клиенты пишут когда удобно им. Слоты пересекаются, визиты забывают, админ собирает расписание из чатов.',
      problemDetail:
        'Окна ищут вручную, два человека могут занять одно время, без напоминаний появляются пустые визиты — админ занят перепиской вместо салона.',
      before:
        'Запись в сообщениях: свободное время уточняли руками, подтверждения терялись, напоминаний не было.',
      work: [
        'Запись в Telegram: услуга → мастер → слот → подтверждение.',
        '«Мои записи», отмена, уведомление админу, напоминание за сутки.',
        'Защита от двойного бронирования и админка на пилоте.',
      ],
      results: [
        'Клиент записывается без звонка.',
        'Админ сразу видит: кто, на что, когда.',
        'Меньше «забыл и не пришёл».',
      ],
      metrics: [
        { value: '4 шага', label: 'от услуги до подтверждённой записи' },
        { value: '0 пересечений', label: 'слоты защищены от двойного бронирования' },
        { value: '24 ч', label: 'напоминание клиенту перед визитом' },
      ],
      url: BARBERSHOP_BOT_URL,
      tags: ['Telegram-бот', 'Онлайн-запись', 'Барбершоп'],
      productCta: 'Открыть бота в Telegram',
      cardMedia: 'screenshot',
      screenshot: {
        src: '/bb-card.jpg?v=3',
        alt: 'Превью бота онлайн-записи: подтверждение визита и уведомление админу в Telegram',
        barLabel: 't.me/PriemZapisi_online_bot',
      },
      demo: null,
      sections: {
        workTitle: 'Запись в боте вместо переписки с админом',
        resultsTitle: 'Клиент берёт слот сам, салон получает понятную запись',
        sliderEyebrow: '03 / Как работает бот',
        sliderTitle: 'Как выглядит сценарий в Telegram',
        sliderLayout: 'phones',
      },
      heroVisual: {
        src: '/bb-card.jpg?v=3',
        alt: 'Два iPhone в барбершопе: запись клиента и уведомление администратору в Telegram',
        cards: [
          {
            position: 'top',
            label: 'Демо',
            text: '@PriemZapisi_online_bot',
          },
          {
            position: 'bottom',
            label: 'Фокус',
            text: 'Слот без звонка и хаоса в чатах',
          },
        ],
      },
      slides: [
        {
          src: '/bb-iphone-01-start.png',
          alt: 'Стартовый экран бота онлайн-записи с меню Записаться, Мои записи и Помощь',
          title: 'Старт',
          description: 'Приветствие и меню записи.',
        },
        {
          src: '/bb-iphone-02-master.png',
          alt: 'Выбор услуги и мастера в боте онлайн-записи',
          title: 'Мастер',
          description: 'Услуга, цена и выбор мастера.',
        },
        {
          src: '/bb-iphone-03-slot.png',
          alt: 'Выбор свободного слота даты и времени в Telegram-боте',
          title: 'Слот',
          description: 'Только свободное время.',
        },
        {
          src: '/bb-iphone-04-confirm.png',
          alt: 'Подтверждение записи клиенту с услугой, мастером, датой и ценой',
          title: 'Готово',
          description: 'Подтверждение визита клиенту.',
        },
        {
          src: '/bb-iphone-05-admin.png',
          alt: 'Уведомление администратору о новой записи с кнопками подтверждения и отмены',
          title: 'Салону',
          description: 'Карточка новой записи админу.',
        },
      ],
    },
  ],
};

function buildServiceTaskPrefill(serviceTitle) {
  return [
    `Интересует услуга «${serviceTitle}».`,
    '',
    'Описание запроса: ',
    'Желаемые сроки: ',
    'Бюджет: ',
    'Пожелания: ',
  ].join('\n');
}

function buildCaseTaskPrefill(caseTitle) {
  return [
    `Интересует проект вроде кейса «${caseTitle}».`,
    '',
    'Описание запроса: ',
    'Для кого: ',
    'Желаемые сроки: ',
    'Бюджет: ',
  ].join('\n');
}

function useYandexMetrika() {
  useEffect(() => {
    if (!YM_COUNTER_ID || typeof window === 'undefined') return undefined;

    const scriptId = 'yandex-metrika-script';
    if (document.getElementById(scriptId)) return undefined;

    window.ym =
      window.ym ||
      function ym(...args) {
        (window.ym.a = window.ym.a || []).push(args);
      };
    window.ym.l = Date.now();

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js`;
    document.head.appendChild(script);

    window.ym(Number(YM_COUNTER_ID), 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });

    return undefined;
  }, []);
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash.replace(/^#/, '') || '/';
}

function useScrollReveal(route) {
  useEffect(() => {
    const targets = document.querySelectorAll(
      [
        '.hero__copy',
        '.hero__visual',
        '.about > div',
        '.stat',
        '.section-head',
        '.service-card',
        '.case-card',
        '.step',
        '.faq-item-wrap',
        '.lead-form',
        '.contact__inner',
        '.info-block',
        '.check-list p',
        '.metric',
        '.result-list span',
        '.gallery-frame',
        '.demo-box',
        '.project-panel',
        '.case-hero__visual',
        '.case-slider',
        '.case-phones__shot',
        '.bs-reveal',
      ].join(', ')
    );

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    targets.forEach((target, index) => {
      target.dataset.reveal = '';
      target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
    });

    document.documentElement.classList.add('reveal-ready');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -70px',
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [route]);
}

function App() {
  const route = useHashRoute();
  const ProductPage = route === '/beige-studio' ? BeigeStudioLanding : null;
  const isProductRoute = Boolean(ProductPage);
  const selectedCase = useMemo(() => {
    const match = route.match(/^\/case\/(.+)$/);
    if (!match) return null;
    return portfolio.cases.find((item) => item.id === match[1]);
  }, [route]);

  useYandexMetrika();

  useEffect(() => {
    if (route === '/' || route.startsWith('/case/') || isProductRoute) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [route, isProductRoute]);

  useEffect(() => {
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const pageUrl = `${SITE_URL.replace(/\/$/, '')}/${window.location.hash || '#/'}`;

    if (ogUrl) ogUrl.setAttribute('content', pageUrl);
    if (canonical) canonical.setAttribute('href', `${SITE_URL.replace(/\/$/, '')}/`);
  }, [route]);

  useScrollReveal(route);

  return (
    <>
      {!isProductRoute && <Header />}
      {ProductPage ? (
        <ProductPage />
      ) : selectedCase ? (
        <CasePage item={selectedCase} />
      ) : (
        <HomePage />
      )}
    </>
  );
}

function Header() {
  const handleHomeClick = () => {
    if (window.location.hash === '#/' || window.location.hash === '') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="На главную" onClick={handleHomeClick}>
        <span className="brand__mark">WS</span>
        <span>{portfolio.brand}</span>
      </a>
      <nav className="nav" aria-label="Основная навигация">
        <a href="#services">Услуги</a>
        <a href="#cases">Кейсы</a>
        <a href="#approach">Подход</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Контакт</a>
      </nav>
      <a className="header-cta" href="#contact">
        Связаться
      </a>
    </header>
  );
}

function HomePage() {
  const [prefillTask, setPrefillTask] = useState('');
  const [prefillService, setPrefillService] = useState('');

  const handleServiceRequest = (serviceTitle) => {
    setPrefillTask(buildServiceTaskPrefill(serviceTitle));
    setPrefillService(serviceTitle);

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main>
      <Hero />
      <About />
      <SocialProof />
      <Services onServiceRequest={handleServiceRequest} />
      <Cases />
      <Approach />
      <Faq />
      <Contact prefillTask={prefillTask} prefillService={prefillService} />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero section">
      <div className="hero__copy">
        <h1>Сайты, лендинги и Telegram-боты под задачу</h1>
        <p className="hero__lead">
          Объяснить услугу, принять заявку или запустить запись — без лишней переписки и пустых
          экранов.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#services">
            Смотреть услуги
          </a>
          <a className="button button--ghost" href="#contact">
            Обсудить проект
          </a>
        </div>
      </div>
      <div className="hero__visual" aria-label="Абстрактный визуал веб-проектов">
        <img src="/hero-visual.png" alt="" />
        <div className="hero-card hero-card--top">
          <span>Система проекта</span>
          <strong>Лендинг + бот + заявка менеджеру</strong>
        </div>
        <div className="hero-card hero-card--bottom">
          <span>Фокус</span>
          <strong>Чтобы человек дошёл до действия</strong>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about">
      <div>
        <p className="eyebrow">01 / Коротко о подходе</p>
        <h2>Сначала действие, потом «красота»</h2>
      </div>
      <div className="about__text">
        <p>
          Собираю проекты вокруг одного шага: оставить заявку, записаться, понять услугу или быстро
          проверить идею.
        </p>
        <p>
          Важно не только как выглядит страница, но и что человек делает дальше — и почему ему это
          удобно.
        </p>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="section social-proof" aria-label="Ключевые показатели">
      <div className="stats">
        {portfolio.stats.map((item) => (
          <article className="stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services({ onServiceRequest }) {
  return (
    <section className="section services" id="services">
      <div className="section-head">
        <p className="eyebrow">02 / Услуги и цены</p>
        <h2>Что можно заказать и с какого бюджета стартовать</h2>
      </div>
      <div className="service-grid">
        {portfolio.services.map((item) => (
          <article
            className={`service-card${item.featured ? ' service-card--featured' : ''}`}
            key={item.id}
          >
            {item.featured && <span className="service-card__badge">Популярно</span>}
            <div className="service-card__head">
              <h3>{item.title}</h3>
              <strong>{item.price}</strong>
            </div>
            <p>{item.summary}</p>
            <ul className="service-card__list">
              {item.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className="button button--case"
              type="button"
              onClick={() => onServiceRequest?.(item.title)}
            >
              {item.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="section cases" id="cases">
      <div className="section-head">
        <p className="eyebrow">03 / Кейсы</p>
        <h2>Проекты, которые можно открыть и показать</h2>
      </div>
      <div className="case-grid">
        {portfolio.cases.map((item) => (
          <article className="case-card" key={item.id}>
            <div className="case-card__media">
              <CaseCardMedia item={item} />
            </div>
            <div className="case-card__body">
              <p className="eyebrow eyebrow--compact">Кейс / {item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.problem}</p>
              <div className="case-card__tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a className="button button--case" href={item.caseHref || `#/case/${item.id}`}>
                Открыть кейс
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    ['01', 'Разобрать задачу', 'Кто заходит, что ему важно и какое действие нужно в итоге.'],
    ['02', 'Собрать структуру', 'Проблема → решение → доверие → цена → кнопка. Без лишних блоков.'],
    ['03', 'Сделать интерфейс', 'Текст, визуал и кнопки на телефоне и на компьютере.'],
    ['04', 'Подготовить запуск', 'Проверка на мобильном, сборка и ссылка, которую можно отправить.'],
  ];

  return (
    <section className="section approach" id="approach">
      <div className="section-head">
        <p className="eyebrow">04 / Подход</p>
        <h2>От идеи до страницы, которую не стыдно отправить</h2>
      </div>
      <div className="steps">
        {steps.map(([number, title, text]) => (
          <article className="step" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="section-head">
        <p className="eyebrow">05 / FAQ</p>
        <h2>Частые вопросы перед стартом</h2>
      </div>
      <div className="faq-list">
        {portfolio.faq.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div className="faq-item-wrap" key={item.question}>
              <article className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                <button
                  className="faq-item__trigger"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="faq-item__answer-wrap" aria-hidden={!isOpen}>
                  <p className="faq-item__answer">{item.answer}</p>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LeadForm({ prefillTask = '', prefillService = '' }) {
  const [form, setForm] = useState({ name: '', contact: '', task: '', honeypot: '' });
  const [submitState, setSubmitState] = useState('idle');
  const [status, setStatus] = useState('');

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  useEffect(() => {
    if (!prefillTask) return;
    setForm((current) => ({ ...current, task: prefillTask }));
    setSubmitState('idle');
  }, [prefillTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitState('idle');

    if (!form.contact.trim() || !form.task.trim()) {
      setStatus('Укажите контакт и кратко опишите задачу — так быстрее отвечу.');
      setSubmitState('error');
      return;
    }

    setSubmitState('submitting');
    setStatus('Отправляю заявку...');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          contact: form.contact.trim(),
          task: form.task.trim(),
          serviceTitle: prefillService,
          source: 'contact-form',
          honeypot: form.honeypot,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Не удалось отправить заявку.');
      }

      setSubmitState('success');
      setStatus(
        'Заявка принята. Ожидайте обратной связи — мы свяжемся с вами в ближайшее время.'
      );
      setForm({ name: '', contact: '', task: '', honeypot: '' });
    } catch (error) {
      setSubmitState('error');
      setStatus(
        error instanceof Error
          ? `Не удалось отправить заявку автоматически: ${error.message}`
          : 'Не удалось отправить заявку автоматически.'
      );
    }
  };

  if (submitState === 'success') {
    return (
      <div className="lead-success" role="status" aria-live="polite">
        <strong>Заявка принята</strong>
        <p>{status}</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <label className="lead-form__honeypot" aria-hidden="true">
        <span>Оставьте поле пустым</span>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={handleChange('honeypot')}
        />
      </label>
      <div className="lead-form__grid">
        <label className="lead-form__field">
          <span>Имя</span>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Как к вам обращаться"
            onChange={handleChange('name')}
            autoComplete="name"
          />
        </label>
        <label className="lead-form__field">
          <span>Контакт</span>
          <input
            type="text"
            name="contact"
            value={form.contact}
            placeholder="Telegram или почта"
            onChange={handleChange('contact')}
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label className="lead-form__field">
        <span>Кратко о задаче</span>
        <textarea
          name="task"
          value={form.task}
          rows={4}
          placeholder="Что нужно сделать, для кого и к какому сроку"
          onChange={handleChange('task')}
          required
        />
      </label>
      <button className="button button--primary" type="submit" disabled={submitState === 'submitting'}>
        {submitState === 'submitting' ? 'Отправка...' : 'Отправить заявку'}
      </button>
      {status && (
        <p className="contact-status" aria-live="polite">
          {status}
        </p>
      )}
      {submitState === 'error' && (
        <div className="lead-form__fallback">
          <a className="button button--telegram" href={portfolio.contact.telegramUrl} target="_blank" rel="noreferrer">
            Написать в Telegram вручную
          </a>
          <a className="button button--ghost" href={portfolio.contact.mailtoUrl}>
            Написать на почту
          </a>
        </div>
      )}
    </form>
  );
}

function Contact({ eyebrow = '06 / Контакт', prefillTask = '', prefillService = '' }) {
  const [copyStatus, setCopyStatus] = useState('');

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.contact.email);
      setCopyStatus('Почта скопирована. Открою форму письма с готовым текстом.');
    } catch {
      setCopyStatus(`Почта: ${portfolio.contact.email}`);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="contact__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h2>Есть идея для проекта?</h2>
        <p>
          Короткая заявка уходит мне в Telegram. Или напишите напрямую — почта и Telegram ниже.
        </p>
        <LeadForm prefillTask={prefillTask} prefillService={prefillService} />
        <div className="hero__actions contact__actions">
          <a
            className="button button--primary"
            href={portfolio.contact.mailUrl}
            onClick={handleEmailClick}
          >
            Написать на почту
          </a>
          <a
            className="button button--telegram"
            href={portfolio.contact.telegramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Написать в Telegram
          </a>
          <a className="button button--ghost" href="#cases">
            Вернуться к кейсам
          </a>
        </div>
        <div className="contact-links" aria-live="polite">
          <span>{portfolio.contact.email}</span>
          <span>{portfolio.contact.telegram}</span>
        </div>
        {copyStatus && <p className="contact-status">{copyStatus}</p>}
      </div>
    </section>
  );
}

function CasePage({ item }) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const contactEyebrow = item.demo ? '05 / Контакт' : '04 / Контакт';

  useEffect(() => {
    if (!isDemoOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDemoOpen(false);
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isDemoOpen]);

  return (
    <main className="case-page">
      <section className="case-hero section">
        <a className="back-link" href="#/">
          ← На главную
        </a>
        <div className="case-hero__grid">
          <div>
            <p className="eyebrow">Кейс / {item.label}</p>
            <h1>{item.title}</h1>
            <p className="hero__lead">{item.problem}</p>
            <div className="hero__actions">
              <a
                className="button button--primary"
                href={item.url}
                {...(item.url.startsWith('#')
                  ? {}
                  : { target: '_blank', rel: 'noreferrer' })}
              >
                {item.productCta}
              </a>
              <a className="button button--ghost" href="#contact">
                Обсудить похожий проект
              </a>
            </div>
          </div>
          {item.heroVisual ? <CaseHeroVisual visual={item.heroVisual} /> : <ProjectPanel item={item} />}
        </div>
      </section>

      <section className="section case-details">
        <InfoBlock title="Для кого сделан" text={item.audience} />
        <InfoBlock title="Какую проблему решает" text={item.problemDetail || item.problem} />
        <InfoBlock title="Как было до" text={item.before} />
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">01 / Что сделано</p>
          <h2>{item.sections.workTitle}</h2>
        </div>
        <div className="check-list">
          {item.work.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
      </section>

      <section className="section results-section">
        <div className="section-head">
          <p className="eyebrow">02 / Что получилось</p>
          <h2>{item.sections.resultsTitle}</h2>
        </div>
        <div className="metrics">
          {item.metrics.map((metric) => (
            <article className="metric" key={metric.value}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
        <div className="result-list">
          {item.results.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </section>

      {item.slides ? (
        <section className="section slider-section">
          <div className="section-head">
            <p className="eyebrow">{item.sections.sliderEyebrow || '03 / Как работает бот'}</p>
            <h2>{item.sections.sliderTitle || 'От первого сообщения до заявки у менеджера — по шагам'}</h2>
          </div>
          {item.sections.sliderLayout === 'phones' || item.sections.sliderLayout === 'shots' ? (
            <PhoneStripGallery
              slides={item.slides}
              variant={item.sections.sliderLayout === 'shots' ? 'shots' : 'phones'}
            />
          ) : (
            <ScreenshotSlider slides={item.slides} />
          )}
        </section>
      ) : (
        <section className="section gallery-section">
          <div className="section-head">
            <p className="eyebrow">03 / Скриншоты</p>
            <h2>Визуальные фрагменты проекта</h2>
          </div>
          <div className="gallery">
            {item.gallery.map((galleryItem) => (
              <GalleryFrame title={galleryItem.title} key={galleryItem.title}>
                <CaseGalleryContent item={item} galleryItem={galleryItem} compact />
              </GalleryFrame>
            ))}
          </div>
        </section>
      )}

      {item.demo && (
        <section className="section demo-section">
          <div className="demo-box">
            <div>
              <p className="eyebrow">04 / Видео-демо</p>
              <h2>Короткий видеообзор проекта</h2>
              <p>{item.demo.description}</p>
            </div>
            <div className="demo-action">
              <div className="demo-preview" aria-hidden="true">
                <div className="demo-preview__bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="demo-preview__screen">
                  <span className="demo-preview__play" />
                  <strong>Начало видео</strong>
                </div>
              </div>
              <button
                className="play-preview"
                type="button"
                aria-label="Открыть видео-демо проекта"
                onClick={() => setIsDemoOpen(true)}
              >
                <span className="play-preview__icon" />
                <span className="play-preview__text">
                  <strong>Запустить демо</strong>
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      <Contact
        eyebrow={contactEyebrow}
        prefillTask={buildCaseTaskPrefill(item.title)}
        prefillService={item.title}
      />
      {isDemoOpen && item.demo && <DemoVideoModal demo={item.demo} onClose={() => setIsDemoOpen(false)} />}
    </main>
  );
}

function DemoVideoModal({ demo, onClose }) {
  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label="Видео-демо проекта">
      <button className="video-modal__backdrop" type="button" aria-label="Закрыть видео" onClick={onClose} />
      <div className="video-modal__panel">
        <div className="video-modal__header">
          <div>
            <p className="eyebrow eyebrow--compact">Демо / Видеообзор</p>
            <h2>{demo.title}</h2>
          </div>
          <button className="video-modal__close" type="button" aria-label="Закрыть видео" onClick={onClose}>
            ×
          </button>
        </div>
        <video className="video-modal__player" controls autoPlay playsInline preload="metadata">
          <source src={demo.src} type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      </div>
    </div>
  );
}

function InfoBlock({ title, text }) {
  return (
    <article className="info-block">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

function CaseCardMedia({ item }) {
  if (item.cardMedia === 'chat') {
    return <ChatMockup compact />;
  }

  return (
    <figure className="case-card__shot">
      <img src={item.screenshot.src} alt={item.screenshot.alt} />
    </figure>
  );
}

function CaseGalleryContent({ item, galleryItem, compact = false }) {
  switch (galleryItem.type) {
    case 'screenshot':
      return <ProjectScreenshot screenshot={item.screenshot} compact={compact} />;
    case 'lead-card':
      return <LeadCardMockup />;
    case 'legal-lead-card':
      return <LegalLeadCardMockup />;
    case 'flow':
      return <FlowMockup />;
    case 'legal-flow':
      return <LegalFlowMockup />;
    case 'chat':
    default:
      return <ChatMockup compact={compact} />;
  }
}

function CasePreviewContent({ previewType }) {
  switch (previewType) {
    case 'chat':
      return <ChatMockup />;
    case 'lead-card':
    default:
      return <LeadCardMockup />;
  }
}

function CaseHeroVisual({ visual }) {
  return (
    <div className="hero__visual case-hero__visual" aria-label={visual.alt}>
      <img src={visual.src} alt={visual.alt} />
      {visual.cards?.map((card) => (
        <div
          className={`hero-card hero-card--${card.position}`}
          key={card.label}
        >
          <span>{card.label}</span>
          <strong>{card.text}</strong>
        </div>
      ))}
    </div>
  );
}

function ProjectScreenshot({ screenshot, compact = false }) {
  return (
    <figure className={`project-shot${compact ? ' project-shot--compact' : ''}`}>
      <div className="project-shot__bar">
        <span />
        <span />
        <span />
        <strong>{screenshot.barLabel}</strong>
      </div>
      <img src={screenshot.src} alt={screenshot.alt} />
    </figure>
  );
}

function ProjectPanel({ item }) {
  return (
    <aside className="project-panel">
      <div className="project-panel__top">
        <span>Превью кейса</span>
        <strong>{item.title}</strong>
      </div>
      <CasePreviewContent previewType={item.preview} />
    </aside>
  );
}

function LeadCardMockup() {
  return (
    <div className="lead-card" aria-hidden="true">
      <span>Новая заявка · Northline</span>
      <strong>Алексей, Telegram-бот</strong>
      <div>Услуга: Telegram-бот</div>
      <div>Срок: в течение месяца</div>
      <div>Бюджет: 50–150 000 ₽</div>
      <button type="button">Готово к ответу</button>
    </div>
  );
}

function FlowMockup() {
  return (
    <div className="flow-mockup" aria-hidden="true">
      <span>Лендинг</span>
      <i />
      <span>Telegram</span>
      <i />
      <span>Карточка</span>
      <i />
      <span>Менеджер</span>
    </div>
  );
}

function LegalFlowMockup() {
  return (
    <div className="flow-mockup" aria-hidden="true">
      <span>Telegram</span>
      <i />
      <span>Сценарий</span>
      <i />
      <span>Supabase</span>
      <i />
      <span>Юрист</span>
    </div>
  );
}

function ChatMockup({ compact = false }) {
  return (
    <div className={`chat-mockup${compact ? ' chat-mockup--compact' : ''}`} aria-hidden="true">
      <div className="chat-mockup__header">
        <span className="chat-mockup__avatar">ПК</span>
        <div className="chat-mockup__meta">
          <strong>Правовой компас</strong>
          <span>бот</span>
        </div>
      </div>
      <div className="chat-mockup__messages">
        <div className="chat-mockup__msg chat-mockup__msg--bot">
          Здравствуйте! Выберите направление права или задайте вопрос.
        </div>
        <div className="chat-mockup__buttons">
          <span>Семейное право</span>
          <span>Трудовые споры</span>
          <span>Недвижимость</span>
          <span>Долги</span>
        </div>
        <div className="chat-mockup__msg chat-mockup__msg--user">
          Нужна консультация по разделу имущества при разводе
        </div>
        <div className="chat-mockup__msg chat-mockup__msg--bot">
          Опишите ситуацию своими словами — после этого помогу оформить заявку.
        </div>
      </div>
    </div>
  );
}

function LegalLeadCardMockup() {
  return (
    <div className="lead-card lead-card--legal" aria-hidden="true">
      <span>Новая заявка</span>
      <strong>Алексей — семейное право</strong>
      <div>Категория: раздел имущества при разводе</div>
      <div>Срочность: на этой неделе</div>
      <div>Телефон: +7 *** ***-**-45</div>
      <button type="button">Принять в работу</button>
    </div>
  );
}

function CaseZoomIcon() {
  return (
    <span className="case-zoom-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
        <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function PhoneStripGallery({ slides, variant = 'phones' }) {
  const [lightbox, setLightbox] = useState(null);
  const isShots = variant === 'shots';

  useEffect(() => {
    if (!lightbox) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightbox]);

  return (
    <>
      <p className="case-phones__hint">Листайте экраны →</p>
      <div className="case-phones-wrap">
        <div
          className={`case-phones${isShots ? ' case-phones--shots' : ''}`}
          role="list"
          aria-label="Экраны бота по шагам"
        >
          {slides.map((slide) => (
            <figure className="case-phones__shot" role="listitem" key={slide.src}>
              <button
                type="button"
                className="case-phones__frame case-phones__frame--zoom"
                aria-label={`Увеличить: ${slide.title}`}
                onClick={() => setLightbox(slide)}
              >
                <img src={slide.src} alt={slide.alt} loading="lazy" />
                <span className="case-zoom-icon-btn">
                  <CaseZoomIcon />
                </span>
              </button>
              <figcaption>
                <strong>{slide.title}</strong>
                <span>{slide.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title}>
          <button
            className="case-lightbox__backdrop"
            type="button"
            aria-label="Закрыть просмотр"
            onClick={() => setLightbox(null)}
          />
          <div className="case-lightbox__panel">
            <div className="case-lightbox__header">
              <strong>{lightbox.title}</strong>
              <button
                className="case-lightbox__close"
                type="button"
                aria-label="Закрыть"
                onClick={() => setLightbox(null)}
              >
                ×
              </button>
            </div>
            <div className="case-lightbox__body">
              <img src={lightbox.src} alt={lightbox.alt || lightbox.title} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ScreenshotSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = slides.length;
  const slide = slides[activeIndex];

  const goTo = (index) => {
    const nextIndex = ((index % total) + total) % total;
    if (nextIndex === activeIndex) return;

    let delta = nextIndex - activeIndex;
    if (delta > total / 2) delta -= total;
    if (delta < -total / 2) delta += total;

    setDirection(delta >= 0 ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  return (
    <div className="case-slider" role="group" aria-roledescription="Слайдер скриншотов">
      <div className="case-slider__stage">
        <div className="case-slider__frame">
          <div className="case-slider__bar">
            <span />
            <span />
            <span />
            <strong>
              Шаг {activeIndex + 1} из {total}
            </strong>
          </div>
          <div className="case-slider__viewport" aria-live="polite">
            <div
              className="case-slider__track"
              style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
            >
              {slides.map((trackSlide) => (
                <figure className="case-slider__slide" key={trackSlide.src}>
                  <img src={trackSlide.src} alt={trackSlide.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`case-slider__caption case-slider__caption--from-${
            direction >= 0 ? 'right' : 'left'
          }`}
          key={activeIndex}
        >
          <p className="eyebrow eyebrow--compact">
            Шаг {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
          <div className="case-slider__controls">
            <button
              className="case-slider__arrow"
              type="button"
              aria-label="Предыдущий скриншот"
              onClick={() => goTo(activeIndex - 1)}
            >
              ←
            </button>
            <div className="case-slider__dots" role="tablist" aria-label="Скриншоты по шагам">
              {slides.map((dot, index) => (
                <button
                  key={dot.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Шаг ${index + 1}: ${dot.title}`}
                  className={`case-slider__dot${index === activeIndex ? ' is-active' : ''}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button
              className="case-slider__arrow"
              type="button"
              aria-label="Следующий скриншот"
              onClick={() => goTo(activeIndex + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div className="case-slider__thumbs">
        {slides.map((thumb, index) => (
          <button
            key={thumb.title}
            type="button"
            className={`case-slider__thumb${index === activeIndex ? ' is-active' : ''}`}
            aria-label={`Показать шаг ${index + 1}: ${thumb.title}`}
            onClick={() => goTo(index)}
          >
            <img src={thumb.src} alt="" loading="lazy" />
            <span>{thumb.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function GalleryFrame({ title, children }) {
  return (
    <article className="gallery-frame">
      <div className="gallery-frame__top">
        <span>{title}</span>
        <small>Превью</small>
      </div>
      {children}
    </article>
  );
}

const beigeStudioServices = [
  {
    title: 'Маникюр с покрытием',
    price: 'от 2 200 ₽',
    description:
      'Обработка кутикулы, коррекция формы, покрытие гель-лаком в один или два слоя.',
  },
  {
    title: 'Педикюр аппаратный',
    price: 'от 2 800 ₽',
    description:
      'Полная обработка стопы, удаление огрубевшей кожи, покрытие по желанию.',
  },
  {
    title: 'Оформление бровей',
    price: 'от 1 200 ₽',
    description:
      'Коррекция формы, окрашивание хной или краской, ламинирование по запросу.',
  },
  {
    title: 'Ламинирование ресниц',
    price: 'от 1 800 ₽',
    description:
      'Изгиб и объём своих ресниц без наращивания — эффект держится 4–6 недель.',
  },
];

const beigeStudioPortfolio = [
  {
    src: '/beige-studio-nails-1.png',
    alt: 'Маникюр в нюдовом оттенке с эффектом стеклянных ногтей',
    caption: 'Glazed-эффект',
  },
  {
    src: '/beige-studio-nails-2.png',
    alt: 'Французский маникюр с тонкой золотой линией',
    caption: 'French с акцентом',
  },
  {
    src: '/beige-studio-nails-3.png',
    alt: 'Нюдовый маникюр на двух руках рядом с чашкой кофе',
    caption: 'Классический нюд',
  },
  {
    src: '/beige-studio-brows.png',
    alt: 'Оформленные брови после коррекции и укладки',
    caption: 'Оформление бровей',
  },
  {
    src: '/beige-studio-lashes.png',
    alt: 'Ресницы после ламинирования крупным планом',
    caption: 'Ламинирование ресниц',
  },
];

const beigeStudioReviews = [
  {
    name: 'Анна',
    initials: 'А',
    text: '«Хожу уже год, покрытие держится по 3 недели без сколов. Всегда подберут оттенок под настроение.»',
  },
  {
    name: 'Мария',
    initials: 'М',
    text: '«Впервые сделала ламинирование бровей — эффект держится дольше, чем обещали в других местах.»',
  },
  {
    name: 'Екатерина',
    initials: 'Е',
    text: '«Атмосфера в студии очень расслабляющая, никогда не торопят. Форма ногтей — просто идеальная.»',
  },
];

/** Placeholder for the client’s real Telegram — replace url (and label if needed) when handing off. */
const BEIGE_STUDIO_TELEGRAM = {
  label: '@beige.studio',
  url: 'https://t.me/beige_studio',
};

const BEIGE_STUDIO_NAV = [
  { id: 'bs-services', label: 'Услуги' },
  { id: 'bs-portfolio', label: 'Работы' },
  { id: 'bs-reviews', label: 'Отзывы' },
  { id: 'bs-contacts', label: 'Контакты' },
];

function BeigeStudioBookingForm({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    service: beigeStudioServices[0]?.title || '',
    honeypot: '',
  });
  const [submitState, setSubmitState] = useState('idle');
  const [status, setStatus] = useState('');

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.contact.trim() || !form.service.trim()) {
      setSubmitState('error');
      setStatus('Укажите контакт и выберите услугу.');
      return;
    }

    setSubmitState('submitting');
    setStatus('Отправляю заявку...');

    const task = `Запись на услугу «${form.service.trim()}».`;

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          contact: form.contact.trim(),
          task,
          serviceTitle: form.service.trim(),
          source: 'beige-studio',
          honeypot: form.honeypot,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Не удалось отправить заявку.');
      }

      setSubmitState('success');
      setStatus('Заявка принята. Мы свяжемся с вами, чтобы подтвердить время.');
      setForm({
        name: '',
        contact: '',
        service: beigeStudioServices[0]?.title || '',
        honeypot: '',
      });
    } catch (error) {
      setSubmitState('error');
      setStatus(
        error instanceof Error && error.message
          ? error.message
          : 'Не удалось отправить заявку.'
      );
    }
  };

  if (submitState === 'success') {
    return (
      <div className="bs-booking__success" role="status" aria-live="polite">
        <strong>Заявка принята</strong>
        <p>{status}</p>
        <button className="bs-button bs-button--primary" type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    );
  }

  return (
    <form className="bs-booking__form" onSubmit={handleSubmit}>
      <label className="bs-booking__honeypot" aria-hidden="true">
        <span>Оставьте поле пустым</span>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={handleChange('honeypot')}
        />
      </label>
      <label className="bs-booking__field">
        <span>Имя</span>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Как к вам обращаться"
          onChange={handleChange('name')}
          autoComplete="name"
        />
      </label>
      <label className="bs-booking__field">
        <span>Телефон или Telegram</span>
        <input
          type="text"
          name="contact"
          value={form.contact}
          placeholder="+7 … или @username"
          onChange={handleChange('contact')}
          autoComplete="tel"
          required
        />
      </label>
      <label className="bs-booking__field">
        <span>Услуга</span>
        <select name="service" value={form.service} onChange={handleChange('service')} required>
          {beigeStudioServices.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title} — {service.price}
            </option>
          ))}
        </select>
      </label>
      <button
        className="bs-button bs-button--primary bs-booking__submit"
        type="submit"
        disabled={submitState === 'submitting'}
      >
        {submitState === 'submitting' ? 'Отправка...' : 'Отправить заявку'}
      </button>
      {status && (
        <p className="bs-booking__status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}

const BEIGE_BOOKING_CLOSE_MS = 420;

function BeigeStudioLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingMounted, setBookingMounted] = useState(false);
  const [bookingClosing, setBookingClosing] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const openBooking = () => {
    closeMenu();
    setBookingClosing(false);
    setBookingMounted(true);
  };
  const closeBooking = () => {
    if (!bookingMounted || bookingClosing) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setBookingMounted(false);
      setBookingClosing(false);
      return;
    }
    setBookingClosing(true);
  };

  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = (event) => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!bookingClosing) return undefined;
    const timer = window.setTimeout(() => {
      setBookingMounted(false);
      setBookingClosing(false);
    }, BEIGE_BOOKING_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [bookingClosing]);

  useEffect(() => {
    if (!bookingMounted && !menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (bookingMounted) {
        if (bookingClosing) return;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          setBookingMounted(false);
          setBookingClosing(false);
          return;
        }
        setBookingClosing(true);
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [bookingMounted, bookingClosing, menuOpen]);

  useEffect(() => {
    if (!bookingMounted) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [bookingMounted]);

  return (
    <div className="bs-page">
      <header className={`bs-header${menuOpen ? ' is-menu-open' : ''}`}>
        <div className="bs-header__inner">
          <a className="bs-brand" href="#bs-hero" onClick={scrollToTop}>
            <span className="bs-brand__mark">BS</span>
            <span>Beige Studio</span>
          </a>
          <nav className="bs-nav" aria-label="Навигация по сайту студии" id="bs-nav">
            {BEIGE_STUDIO_NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={scrollToSection(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="bs-header__actions">
            <button className="bs-button bs-button--primary" type="button" onClick={openBooking}>
              Записаться
            </button>
            <button
              className="bs-menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="bs-nav"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="bs-hero" id="bs-hero">
          <div className="bs-hero__copy bs-reveal">
            <p className="bs-eyebrow">Студия маникюра и бровей</p>
            <h1>Уход за собой в спокойном, уютном темпе</h1>
            <p className="bs-hero__lead">
              Маникюр, педикюр, брови и ресницы — в одном месте, где не торопят и всё по-настоящему
              аккуратно.
            </p>
            <div className="bs-hero__actions">
              <button className="bs-button bs-button--primary" type="button" onClick={openBooking}>
                Записаться на процедуру
              </button>
              <a
                className="bs-button bs-button--ghost"
                href="#bs-services"
                onClick={scrollToSection('bs-services')}
              >
                Смотреть цены
              </a>
            </div>
          </div>
          <figure className="bs-hero__visual bs-reveal">
            <img
              src="/beige-studio-hero.png"
              alt="Мастер наносит гель-лак на ногти клиентки в светлой студии"
            />
          </figure>
        </section>

        <section className="bs-about" id="bs-about">
          <figure className="bs-about__photo bs-reveal">
            <img
              src="/beige-studio-master.png"
              alt="Мастер студии Beige Studio с инструментами в руках"
            />
          </figure>
          <div className="bs-about__text bs-reveal">
            <p className="bs-eyebrow">О мастере</p>
            <h2>7 лет в бьюти-индустрии и любовь к деталям</h2>
            <p>
              Работаю с маникюром, покрытием и оформлением бровей с 2017 года, регулярно прохожу
              обучение у российских и корейских мастеров. Использую только сертифицированные
              материалы и одноразовые расходники.
            </p>
            <p>
              Приём — по записи, без спешки: на каждую процедуру закладываю достаточно времени, чтобы
              результат держался долго и выглядел аккуратно даже спустя три недели.
            </p>
          </div>
        </section>

        <section className="bs-services" id="bs-services">
          <div className="bs-section-head bs-reveal">
            <p className="bs-eyebrow">Услуги и цены</p>
            <h2>Можно выбрать одну процедуру или прийти на комплекс</h2>
          </div>
          <div className="bs-services__grid">
            {beigeStudioServices.map((service) => (
              <article className="bs-service-card bs-reveal" key={service.title}>
                <div className="bs-service-card__head">
                  <h3>{service.title}</h3>
                  <strong>{service.price}</strong>
                </div>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bs-portfolio" id="bs-portfolio">
          <div className="bs-section-head bs-reveal">
            <p className="bs-eyebrow">Портфолио работ</p>
            <h2>Аккуратные формы, спокойные цвета, чистая линия</h2>
          </div>
          <div className="bs-portfolio__grid">
            {beigeStudioPortfolio.map((photo) => (
              <figure className="bs-portfolio__item bs-reveal" key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="bs-atmosphere bs-reveal">
          <img
            className="bs-atmosphere__photo"
            src="/beige-studio-lifestyle.png"
            alt="Чашка кофе в руках клиентки после маникюра"
            loading="lazy"
          />
          <div className="bs-atmosphere__text">
            <p className="bs-eyebrow">Атмосфера</p>
            <h2>Полчаса для себя — без спешки и лишних разговоров</h2>
          </div>
        </section>

        <section className="bs-reviews" id="bs-reviews">
          <div className="bs-section-head bs-reveal">
            <p className="bs-eyebrow">Отзывы</p>
            <h2>Что говорят клиентки после визита</h2>
          </div>
          <div className="bs-reviews__grid">
            {beigeStudioReviews.map((review) => (
              <article className="bs-review-card bs-reveal" key={review.name}>
                <span className="bs-review-card__avatar">{review.initials}</span>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="bs-contacts" id="bs-contacts">
          <figure className="bs-contacts__visual bs-reveal">
            <img src="/beige-studio-interior.png" alt="Интерьер студии Beige Studio" loading="lazy" />
          </figure>
          <div className="bs-contacts__info bs-reveal">
            <p className="bs-eyebrow">Запись и контакты</p>
            <h2>Ждём вас в студии на Тверской</h2>
            <ul className="bs-contacts__list">
              <li>
                <span>Адрес</span>
                <strong>Москва, ул. Тверская, 14, студия 3</strong>
              </li>
              <li>
                <span>Часы работы</span>
                <strong>Ежедневно, 10:00–21:00</strong>
              </li>
              <li>
                <span>Телефон</span>
                <a href="tel:+79993221405">+7 (999) 322-14-05</a>
              </li>
              <li>
                <span>Telegram</span>
                <a href={BEIGE_STUDIO_TELEGRAM.url} target="_blank" rel="noreferrer">
                  {BEIGE_STUDIO_TELEGRAM.label}
                </a>
              </li>
            </ul>
            <p className="bs-contacts__note">
              Свяжитесь по телефону или в Telegram — подберём удобное время под вашу процедуру.
            </p>
            <button className="bs-button bs-button--primary" type="button" onClick={openBooking}>
              Записаться онлайн
            </button>
          </div>
        </section>
      </main>

      <footer className="bs-footer">
        <span>© {new Date().getFullYear()} Beige Studio</span>
        <span>Маникюр · Педикюр · Брови · Ресницы</span>
      </footer>

      {bookingMounted && (
        <div
          className={`bs-booking${bookingClosing ? ' is-closing' : ''}`}
          role="presentation"
        >
          <button
            className="bs-booking__backdrop"
            type="button"
            aria-label="Закрыть форму записи"
            onClick={closeBooking}
            disabled={bookingClosing}
          />
          <div
            className="bs-booking__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bs-booking-title"
          >
            <div className="bs-booking__head">
              <h2 id="bs-booking-title">Запись на процедуру</h2>
              <button
                className="bs-booking__close"
                type="button"
                aria-label="Закрыть"
                onClick={closeBooking}
                disabled={bookingClosing}
              >
                ×
              </button>
            </div>
            <BeigeStudioBookingForm onClose={closeBooking} />
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
