import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useLanguage } from '../i18n';

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert(t('loginSuccess'));
    } catch (error) {
      alert(t('loginError') + error.message);
    }
  };

  return (
    <div className="neo-card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t('teacherLogin')}</h2>
      <form onSubmit={handleLogin}>
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
        <button className="neo-button" type="submit" style={{ width: '100%' }}>{t('loginBtn')}</button>
      </form>
    </div>
  );
}
