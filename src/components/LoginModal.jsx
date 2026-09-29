import React, { useState } from 'react';

const LoginModal = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onLogin(trimmed);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Выберите псевдоним</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя..."
            autoFocus
          />
          <button type="submit">Продолжить</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;