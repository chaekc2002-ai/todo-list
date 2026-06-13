import React from 'react';
import TeacherLogin from './pages/TeacherLogin';
import StudentSignup from './pages/StudentSignup';
import TodoList from './pages/TodoList';

function App() {
  return (
    <div className="app-container">
      <h1 className="header-title">Todo Management App</h1>
      <div className="auth-forms">
        <TeacherLogin />
        <StudentSignup />
      </div>
      <TodoList />
    </div>
  );
}

export default App;
