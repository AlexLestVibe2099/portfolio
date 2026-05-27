import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const portfolio = {
  brand: 'Webstack Lab',
  contact: {
    email: 'hello@webstack-lab.ru',
    telegram: '@your_username',
  },
  cases: [
    {
      id: 'telegram-zayavchnik',
      title: 'Telegram-заявочник',
      label: 'Лендинг + Telegram-сценарий',
      audience: 'Для услуг, онлайн-обучения, студий и небольших команд, где заявки приходят из разных каналов.',
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

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash.replace(/^#/, '') || '/';
}

function App() {
  const route = useHashRoute();
  const selectedCase = useMemo(() => {
    const match = route.match(/^\/case\/(.+)$/);
    if (!match) return null;
    return portfolio.cases.find((item) => item.id === match[1]);
  }, [route]);

  useEffect(() => {
    if (route === '/' || route.startsWith('/case/')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [route]);

  return (
    <>
      <Header />
      {selectedCase ? <CasePage item={selectedCase} /> : <HomePage />}
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="На главную">
        <span className="brand__mark">WS</span>
        <span>{portfolio.brand}</span>
      </a>
      <nav className="nav" aria-label="Основная навигация">
        <a href="#cases">Кейсы</a>
        <a href="#approach">Подход</a>
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
      <Cases />
      <Approach />
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
          <a className="button button--primary" href="#cases">
            Смотреть кейсы
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
        <p className="eyebrow">Коротко о подходе</p>
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

function Cases() {
  return (
    <section className="section cases" id="cases">
      <div className="section-head">
        <p className="eyebrow">Кейсы</p>
        <h2>Проекты, которые можно открыть, показать и развивать дальше</h2>
      </div>
      <div className="case-grid">
        {portfolio.cases.map((item) => (
          <article className="case-card" key={item.id}>
            <div className="case-card__media">
              <ProjectScreenshot compact />
            </div>
            <div className="case-card__body">
              <p className="case-card__label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.problem}</p>
              <div className="case-card__tags">
                <span>Лендинг</span>
                <span>Telegram</span>
                <span>Заявки</span>
              </div>
              <a className="text-link" href={`#/case/${item.id}`}>
                Открыть кейс
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MiniLandingMockup() {
  return (
    <div className="mini-mockup" aria-hidden="true">
      <div className="mini-mockup__bar" />
      <div className="mini-mockup__headline" />
      <div className="mini-mockup__line mini-mockup__line--short" />
      <div className="mini-mockup__row">
        <span />
        <span />
        <span />
      </div>
      <div className="mini-mockup__cta" />
    </div>
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
        <p className="eyebrow">Подход</p>
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

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact__inner">
        <p className="eyebrow">Контакт</p>
        <h2>Есть идея для следующего проекта?</h2>
        <p>
          Можно начать с короткого описания задачи: что нужно показать, кто будет смотреть страницу и какое
          действие должен сделать человек после просмотра.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href={`mailto:${portfolio.contact.email}`}>
            Написать на почту
          </a>
          <a className="button button--ghost" href="#cases">
            Вернуться к кейсам
          </a>
        </div>
      </div>
    </section>
  );
}

function CasePage({ item }) {
  return (
    <main className="case-page">
      <section className="case-hero section">
        <a className="back-link" href="#/">
          ← На главную
        </a>
        <div className="case-hero__grid">
          <div>
            <p className="eyebrow">{item.label}</p>
            <h1>{item.title}</h1>
            <p className="hero__lead">{item.problem}</p>
            <div className="hero__actions">
              <a className="button button--primary" href={item.url}>
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
          <p className="eyebrow">Что сделано</p>
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
          <p className="eyebrow">Что получилось</p>
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
          <p className="eyebrow">Скриншоты</p>
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
            <p className="eyebrow">Видео-демо</p>
            <h2>Место для короткого видеообзора</h2>
            <p>
              Сюда можно будет поставить запись экрана: как человек открывает лендинг, выбирает действие,
              проходит Telegram-сценарий и попадает в готовую заявку для менеджера.
            </p>
          </div>
          <div className="play-preview" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

      <Contact />
    </main>
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
      <img
        src="/case-telegram-landing.png"
        alt="Скриншот лендинга Telegram-заявочник"
      />
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
      <button>Готово к ответу</button>
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
