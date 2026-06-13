import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useLanguage } from '../i18n';

export default function StudentSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert(t('signupSuccess'));
    } catch (error) {
      alert(t('signupError') + error.message);
    }
  };

  return (
    <div className="neo-card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--secondary)' }}>{t('studentSignup')}</h2>
      <form onSubmit={handleSignup}>
        <input 
          className="neo-input" 
          type="email" 
          placeholder={t('emailPlaceholder')} 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="neo-input" 
          type="password" 
          placeholder={t('passwordPlaceholder')} 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button className="neo-button secondary" type="submit" style={{ width: '100%' }}>{t('signupBtn')}</button>
      </form>
    </div>
  );
}
