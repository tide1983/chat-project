Chat Project

Корпоративный чат с использованием WebSocket.

Демо

🌐 **[Открыть чат на GitHub Pages](https://tide1983.github.io/chat-project/)**

Стек

- Frontend: React, Webpack, WebSocket
- Backend: Node.js, Express, WebSocket ([репозиторий](https://github.com/tide1983/my-chat-backend))
- Хостинг backend: [Amvera](https://amvera.ru/)

Функционал

- Регистрация пользователя по имени (с проверкой уникальности)
- Список всех участников чата в реальном времени
- Обмен сообщениями в реальном времени через WebSocket
- Свои сообщения выровнены вправо и подсвечены красным
- Сообщения собеседников выровнены влево
- Пользователи удаляются из списка при отключении

Скрипты

```bash
npm install       # установка зависимостей
npm start         # запуск dev-сервера на http://localhost:3000
npm run build     # продакшн-сборка в папку dist
