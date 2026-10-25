# Payment Portal & Gateway

Максимально простой, легковесный сайт для приёма оплат, готовый к публикации на **GitHub Pages** в 1 клик.

## 🚀 Способы оплаты для пользователей

1. **DonatePay**:
   - Встроенный официальный виджет прямо на странице.
   - Оплата картами банков РФ (МИР, Visa, Mastercard), через СБП (QR-код) и ЮMoney.
   - Поддерживает выбор суммы (100, 300, 500, 1000 ₽) и поле для комментария к переводу.
2. **Tribute (Telegram Pay)**:
   - Прямой переход в бота/WebApp: `https://web.tribute.tg/d/SQQ`.
   - Оплата через Telegram в 1 клик, СБП без комиссии, карты МИР, TON.
3. **Boosty**:
   - Прямой переход: `https://boosty.to/yohannson/donate`.
   - Поддержка зарубежных банковских карт и PayPal, а также встроенный QR-код для быстрого доната со смартфона.

---

## 🌐 Как задеплоить на GitHub Pages (за 1 минуту)

1. Создайте новый репозиторий на GitHub (например, `payment`).
2. Запушьте файлы из этой папки в репозиторий:
   ```bash
   git init
   git add .
   git commit -m "feat: initial payment portal"
   git branch -M main
   git remote add origin https://github.com/ВАШ_НИК/payment.git
   git push -u origin main
   ```
3. Откройте в GitHub: **Settings** → **Pages**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
   - Нажмите **Save**.
4. Через 30 секунд ваш сайт будет доступен по адресу:
   `https://ВАШ_НИК.github.io/payment/`

> **Примечание**: благодаря директиве `referrerpolicy="origin"`, виджет DonatePay стабильно работает на GitHub Pages без ошибок 404.
