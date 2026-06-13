import React from 'react';
import TeacherLogin from './pages/TeacherLogin';
import StudentSignup from './pages/StudentSignup';
import TodoList from './pages/TodoList';
import { useLanguage } from './i18n';

function App() {
  const { toggleLanguage, t } = useLanguage();

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button className="neo-button" onClick={toggleLanguage} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          {t('toggleLang')}
        </button>
      </div>
      <h1 className="header-title">{t('appTitle')}</h1>
      <div className="auth-forms">
        <TeacherLogin />
        <StudentSignup />
      </div>
      <TodoList />
    </div>
  );
}

export default App;
