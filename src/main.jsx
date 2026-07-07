import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://your-portfolio.vercel.app';
const YM_COUNTER_ID = import.meta.env.VITE_YM_COUNTER_ID || '';

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
    { value: '1+', label: 'готовый кейс в портфолио' },
    { value: '3–7 дней', label: 'типичный срок запуска' },
    { value: 'от 5 000 ₽', label: 'стартовый проект под ключ' },
  ],
  services: [
    {
      id: 'landing',
      title: 'Лендинг',
      price: 'от 5 000 ₽',
      summary: 'Одностраничный сайт, который объясняет услугу и ведёт к заявке.',
      features: ['Адаптивная вёрстка', 'Структура под конверсию', 'Готовность к деплою'],
      cta: 'Заказать лендинг',
    },
    {
      id: 'bot',
      title: 'Telegram-бот',
      price: 'от 8 000 ₽',
      summary: 'Бот собирает детали заявки и отдаёт менеджеру готовую карточку.',
      features: ['Сценарий вопросов', 'Уведомления менеджеру', 'Простая настройка'],
      cta: 'Заказать бота',
      featured: true,
    },
    {
      id: 'bundle',
      title: 'Лендинг + бот',
      price: 'от 12 000 ₽',
      summary: 'Связка: человек с лендинга попадает в Telegram и оставляет полную заявку.',
      features: ['Единый путь клиента', 'Меньше потерянных лидов', 'Готовый кейс как образец'],
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
      label: 'Лендинг + Telegram-сценарий',
      audience:
        'Для услуг, онлайн-обучения, студий и небольших команд, где заявки приходят из разных каналов.',
      problem:
        'Клиент пишет короткое сообщение, менеджер вручную уточняет задачу, бюджет, сроки и контакт, а часть обращений остывает до нормального разговора.',
      before:
        'До решения заявки были разбросаны по чатам, часть вопросов повторялась, а менеджеру приходилось заново собирать контекст перед каждым ответом.',
      work: [
        'Собран лендинг, который быстро объясняет продукт и переводит человека к целевому действию.',
        'Продуман сценарий первичного уточнения заявки: услуга, срок, бюджет и контакт.',
        'Сделана логика готовой карточки, чтобы менеджер видел не просто сообщение, а понятный запрос.',
      ],
      results: [
        'Заявка становится понятной до первого ответа менеджера.',
        'Меньше ручных уточнений и повторяющихся вопросов.',
        'Проще определить, кому отвечать первым и какую заявку вести к оплате.',
      ],
      metrics: [
        { value: 'до 30 мин', label: 'на первичную настройку сценария' },
        { value: '3 шага', label: 'от интереса до готовой заявки' },
        { value: '1 экран', label: 'для быстрого перехода к оплате или контакту' },
      ],
      url: 'https://telegram-landing-gamma.vercel.app/',
    },
  ],
};

function buildLeadMessage({ name, contact, task }) {
  return [
    'Здравствуйте! Хочу обсудить проект.',
    '',
    name ? `Имя: ${name}` : null,
    contact ? `Контакт: ${contact}` : null,
    task ? `Задача: ${task}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function buildServiceLeadMessage(serviceTitle) {
  return `Здравствуйте! Интересует услуга «${serviceTitle}».\n\nЗадача: \nСрок: \nБюджет: `;
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
  const selectedCase = useMemo(() => {
    const match = route.match(/^\/case\/(.+)$/);
    if (!match) return null;
    return portfolio.cases.find((item) => item.id === match[1]);
  }, [route]);

  useYandexMetrika();

  useEffect(() => {
    if (route === '/' || route.startsWith('/case/')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [route]);

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
      <Header />
      {selectedCase ? <CasePage item={selectedCase} /> : <HomePage />}
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
  return (
    <main>
      <Hero />
      <About />
      <SocialProof />
      <Services />
      <Cases />
      <Approach />
      <Faq />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero section">
      <div className="hero__copy">
        <h1>Сайты, лендинги и Telegram-сценарии</h1>
        <p className="hero__lead">
          Под реальные задачи: объяснить продукт, принять заявку, показать кейс и быстрее
          запустить решение в работу.
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
          <strong>Лендинг + бот + карточка заявки</strong>
        </div>
        <div className="hero-card hero-card--bottom">
          <span>Фокус</span>
          <strong>Понятный путь к запуску</strong>
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
        <h2>Не просто красивая страница, а упаковка задачи в рабочий сценарий</h2>
      </div>
      <div className="about__text">
        <p>
          Я собираю проекты вокруг конкретного действия: оставить заявку, понять услугу, перейти к
          консультации, увидеть результат или быстро проверить идею.
        </p>
        <p>
          Поэтому в каждом кейсе важны не только визуал и верстка, но и путь пользователя: что он видит,
          что понимает и почему делает следующий шаг.
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

function Services() {
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
            <a
              className="button button--case"
              href={`https://t.me/${portfolio.contact.telegramHandle}?text=${encodeURIComponent(
                buildServiceLeadMessage(item.title)
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              {item.cta}
            </a>
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
        <h2>Проекты, которые можно открыть, показать и развивать дальше</h2>
      </div>
      <div className="case-grid">
        {portfolio.cases.map((item) => (
          <article className="case-card" key={item.id}>
            <div className="case-card__media">
              <ProjectScreenshot compact />
            </div>
            <div className="case-card__body">
              <p className="eyebrow eyebrow--compact">Кейс / {item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.problem}</p>
              <div className="case-card__tags">
                <span>Лендинг</span>
                <span>Telegram</span>
                <span>Заявки</span>
              </div>
              <a className="button button--case" href={`#/case/${item.id}`}>
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
    ['01', 'Разобрать задачу', 'Понять, кто заходит на сайт, что ему важно и какое действие нужно получить.'],
    ['02', 'Собрать структуру', 'Разложить путь пользователя по блокам: проблема, решение, доверие, цена и CTA.'],
    ['03', 'Сделать интерфейс', 'Собрать адаптивный React-интерфейс, где текст, визуал и кнопки работают вместе.'],
    ['04', 'Подготовить запуск', 'Проверить мобильную версию, сборку и ссылку, чтобы проект можно было деплоить.'],
  ];

  return (
    <section className="section approach" id="approach">
      <div className="section-head">
        <p className="eyebrow">04 / Подход</p>
        <h2>От идеи до страницы, которую не стыдно отправить клиенту</h2>
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
                {isOpen && <p className="faq-item__answer">{item.answer}</p>}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LeadForm() {
  const [form, setForm] = useState({ name: '', contact: '', task: '' });
  const [status, setStatus] = useState('');

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.contact.trim() || !form.task.trim()) {
      setStatus('Укажите контакт и кратко опишите задачу — так быстрее отвечу.');
      return;
    }

    const message = buildLeadMessage(form);
    const telegramUrl = `https://t.me/${portfolio.contact.telegramHandle}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    setStatus('Открыл Telegram с готовым текстом заявки. Можно отправить как есть или дописать детали.');
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
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
      <button className="button button--primary" type="submit">
        Отправить заявку в Telegram
      </button>
      {status && (
        <p className="contact-status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}

function Contact({ eyebrow = '06 / Контакт' }) {
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
        <h2>Есть идея для следующего проекта?</h2>
        <p>
          Оставьте короткую заявку ниже или напишите напрямую — в письме и Telegram уже будет заготовленный
          текст, останется дописать детали.
        </p>
        <LeadForm />
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
              <a className="button button--primary" href={item.url} target="_blank" rel="noreferrer">
                Открыть продукт
              </a>
              <a className="button button--ghost" href="#contact">
                Обсудить похожий проект
              </a>
            </div>
          </div>
          <ProjectPanel item={item} />
        </div>
      </section>

      <section className="section case-details">
        <InfoBlock title="Для кого сделан" text={item.audience} />
        <InfoBlock title="Какую проблему решает" text={item.problem} />
        <InfoBlock title="Как было до" text={item.before} />
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">01 / Что сделано</p>
          <h2>Связка, которая превращает интерес в понятную заявку</h2>
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
          <h2>Менеджер получает не хаотичное сообщение, а подготовленный запрос</h2>
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

      <section className="section gallery-section">
        <div className="section-head">
          <p className="eyebrow">03 / Скриншоты</p>
          <h2>Визуальные фрагменты проекта</h2>
        </div>
        <div className="gallery">
          <GalleryFrame title="Главный экран">
            <ProjectScreenshot compact />
          </GalleryFrame>
          <GalleryFrame title="Карточка заявки">
            <LeadCardMockup />
          </GalleryFrame>
          <GalleryFrame title="Путь пользователя">
            <FlowMockup />
          </GalleryFrame>
        </div>
      </section>

      <section className="section demo-section">
        <div className="demo-box">
          <div>
            <p className="eyebrow">04 / Видео-демо</p>
            <h2>Короткий видеообзор проекта</h2>
            <p>
              Можно быстро посмотреть, как выглядит лендинг вживую: первый экран, логика заявки,
              ключевые блоки и переход к опубликованному продукту.
            </p>
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

      <Contact eyebrow="05 / Контакт" />
      {isDemoOpen && <DemoVideoModal onClose={() => setIsDemoOpen(false)} />}
    </main>
  );
}

function DemoVideoModal({ onClose }) {
  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label="Видео-демо проекта">
      <button className="video-modal__backdrop" type="button" aria-label="Закрыть видео" onClick={onClose} />
      <div className="video-modal__panel">
        <div className="video-modal__header">
          <div>
            <p className="eyebrow eyebrow--compact">Демо / Видеообзор</p>
            <h2>Telegram-заявочник в работе</h2>
          </div>
          <button className="video-modal__close" type="button" aria-label="Закрыть видео" onClick={onClose}>
            ×
          </button>
        </div>
        <video className="video-modal__player" controls autoPlay playsInline preload="metadata">
          <source src="/demo-telegram-zayavchnik.mp4" type="video/mp4" />
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

function ProjectScreenshot({ compact = false }) {
  return (
    <figure className={`project-shot${compact ? ' project-shot--compact' : ''}`}>
      <div className="project-shot__bar">
        <span />
        <span />
        <span />
        <strong>telegram-landing-gamma.vercel.app</strong>
      </div>
      <img src="/case-telegram-landing.png" alt="Скриншот лендинга Telegram-заявочник" />
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
      <LeadCardMockup />
    </aside>
  );
}

function LeadCardMockup() {
  return (
    <div className="lead-card" aria-hidden="true">
      <span>Новая заявка</span>
      <strong>Мария хочет консультацию</strong>
      <div>Услуга: индивидуальная консультация</div>
      <div>Срок: на этой неделе</div>
      <div>Бюджет: до 8 000 ₽</div>
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

createRoot(document.getElementById('root')).render(<App />);
