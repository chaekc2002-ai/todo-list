import React from 'react';
import TeacherLogin from './pages/TeacherLogin';
import StudentSignup from './pages/StudentSignup';
import TodoList from './pages/TodoList';

function App() {
  return (
    <div>
      <h1>Todo Management App</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <TeacherLogin />
        <StudentSignup />
      </div>
      <hr />
      <TodoList />
    </div>
  );
}

export default App;
