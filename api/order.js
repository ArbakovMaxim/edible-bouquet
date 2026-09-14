/**
 * Serverless-функция Vercel: принимает заказ с фронта и отправляет его в Telegram.
 *
 * Токен и chat_id читаются из переменных окружения (Vercel → Settings →
 * Environment Variables) и никогда не попадают в клиентский бандл:
 *   TELEGRAM_BOT_TOKEN — токен от @BotFather
 *   TELEGRAM_CHAT_ID   — куда слать заказы
 */

const MAX_ITEMS = 50;
const MAX_LEN = { name: 40, phone: 30, messenger: 60, comment: 300 };

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clean = (value, maxLength) =>
  String(value ?? "")
    .trim()
    .slice(0, maxLength);

const formatDate = (value) => {
  // new Date(null) даёт 01.01.1970, а не Invalid Date — отсекаем пустые значения явно
  if (value === null || value === undefined || value === "") return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const buildMessage = ({ customer, items, total, deliveryDate, language }) => {
  const lines = [
    "🎁 <b>Нове замовлення</b>",
    "",
    `<b>Імʼя:</b> ${escapeHtml(customer.firstName)} ${escapeHtml(
      customer.lastName
    )}`,
    `<b>Телефон:</b> ${escapeHtml(customer.phone)}`,
  ];

  if (customer.messenger) {
    lines.push(`<b>Месенджер:</b> ${escapeHtml(customer.messenger)}`);
  }

  lines.push(`<b>Дата доставки:</b> ${escapeHtml(deliveryDate)}`);

  if (language) {
    lines.push(`<b>Мова:</b> ${escapeHtml(language === "ru" ? "російська" : "українська")}`);
  }

  lines.push("", "<b>Букети:</b>");

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${escapeHtml(item.name)} — ${item.count} шт × ${
        item.price
      } грн = <b>${item.sum} грн</b>`
    );
  });

  lines.push("", `<b>Разом: ${total} грн</b>`);

  if (customer.comment) {
    lines.push("", `<b>Коментар:</b> ${escapeHtml(customer.comment)}`);
  }

  return lines.join("\n");
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");
    return res.status(500).json({ error: "Server is not configured" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    const firstName = clean(body.firstName, MAX_LEN.name);
    const lastName = clean(body.lastName, MAX_LEN.name);
    const phone = clean(body.phone, MAX_LEN.phone);
    const messenger = clean(body.messenger, MAX_LEN.messenger);
    const comment = clean(body.comment, MAX_LEN.comment);
    const deliveryDate = formatDate(body.selectedDate);
    const language = body.language === "ru" ? "ru" : "uk";

    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({ error: "Не заповнені обовʼязкові поля" });
    }

    if (!deliveryDate) {
      return res.status(400).json({ error: "Некоректна дата доставки" });
    }

    if (rawItems.length === 0 || rawItems.length > MAX_ITEMS) {
      return res.status(400).json({ error: "Некоректний склад замовлення" });
    }

    const items = rawItems.map((item) => {
      const price = Number(item.price) || 0;
      const count = Number(item.count) || 0;
      return {
        name: clean(item.name, 100),
        price,
        count,
        sum: price * count,
      };
    });

    if (items.some((item) => item.count <= 0 || item.price <= 0)) {
      return res.status(400).json({ error: "Некоректний склад замовлення" });
    }

    const total = items.reduce((sum, item) => sum + item.sum, 0);

    const text = buildMessage({
      customer: { firstName, lastName, phone, messenger, comment },
      items,
      total,
      deliveryDate,
      language,
    });

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Telegram API error:", response.status, details);
      return res.status(502).json({ error: "Не вдалося надіслати замовлення" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Order handler failed:", error);
    return res.status(500).json({ error: "Внутрішня помилка" });
  }
};
