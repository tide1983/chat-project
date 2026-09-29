import React, { useState } from 'react';
import LoginModal from './components/LoginModal';
import Chat from './components/Chat';
import { API_URL } from './config';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (name) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/new-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok || data.status === 'error') {
        setError(data.message || 'Ошибка регистрации');
        return;
      }

      setUser(data.user);
    } catch (e) {
      setError('Не удалось подключиться к серверу');
      console.error(e);
    }
  };

  if (!user) {
    return (
      <>
        <LoginModal onLogin={handleLogin} />
        {error && <div className="global-error">{error}</div>}
      </>
    );
  }

  return <Chat currentUser={user} />;
};

export default App;