import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="container">
      <h1>Bejelentkezés</h1>
      {isSent ? (
        <p>Sikeres beküldés!</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setIsSent(true); }}>
          <label htmlFor="email-input">E-mail:</label>
          <input 
            id="email-input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="pelda@email.com"
          />
          <button type="submit">Küldés</button>
        </form>
      )}
    </div>
  );
}