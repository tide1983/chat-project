import React, { useEffect, useState, useRef } from 'react';
import { WS_URL } from '../config';

const Chat = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WS connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Различаем тип данных: массив (юзеры) или объект (сообщение)
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data.type === 'send' || data.message) {
        setMessages((prev) => [...prev, data]);
      }
    };

    ws.onclose = () => {
      console.log('WS disconnected');
      setIsConnected(false);
    };

    // Отправляем exit при закрытии вкладки
    const handleBeforeUnload = () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'exit', user: currentUser }));
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      ws.close();
    };
  }, [currentUser]);

  // Автоскролл
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'send',
      message: text,
      user: currentUser,
    }));
    setInput('');
  };

  const formatTime = () => {
    return new Date().toLocaleString('ru-RU', {
      hour: '2-digit', minute: '2-digit',
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        {users.map((u) => {
          const isMe = u.id === currentUser.id;
          return (
            <div key={u.id} className={`user-item ${isMe ? 'me' : ''}`}>
              <div className="avatar" />
              <span>{isMe ? 'You' : u.name}</span>
            </div>
          );
        })}
      </aside>

      <main className="chat-main">
        <div className="messages">
          {messages.map((m, i) => {
            const isMe = m.user?.id === currentUser.id;
            return (
              <div key={i} className={`message ${isMe ? 'my-message' : 'other-message'}`}>
                <div className="meta">
                  {isMe ? 'You' : m.user?.name}, {formatTime()}
                </div>
                <div className="text">{m.message}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form className="input-area" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here"
            disabled={!isConnected}
          />
        </form>
      </main>
    </div>
  );
};

export default Chat;