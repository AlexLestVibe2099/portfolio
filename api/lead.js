const REQUIRED_FIELDS = ['contact', 'task'];

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function buildTelegramMessage(payload) {
  const lines = [
    'Новая заявка с сайта Webstack Lab',
    '',
    payload.serviceTitle ? `Услуга: ${payload.serviceTitle}` : null,
    payload.name ? `Имя: ${payload.name}` : null,
    `Контакт: ${payload.contact}`,
    `Задача: ${payload.task}`,
    payload.source ? `Источник: ${payload.source}` : null,
    payload.page ? `Страница: ${payload.page}` : null,
    payload.userAgent ? `User-Agent: ${payload.userAgent}` : null,
    `Время: ${new Date().toLocaleString('ru-RU')}`,
  ];

  return lines.filter(Boolean).join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const payload = normalizeBody(req.body);
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (payload.honeypot) {
    return res.status(200).json({ ok: true });
  }

  const missingField = REQUIRED_FIELDS.find((field) => !String(payload[field] || '').trim());
  if (missingField) {
    return res.status(400).json({ ok: false, error: `Missing required field: ${missingField}` });
  }

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Telegram env vars are not configured' });
  }

  const message = buildTelegramMessage({
    ...payload,
    page: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
  });

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!telegramResponse.ok) {
      const errorBody = await telegramResponse.text();
      return res.status(502).json({ ok: false, error: `Telegram API error: ${errorBody}` });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown server error',
    });
  }
}
