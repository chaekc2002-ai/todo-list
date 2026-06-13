import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    setTodos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await addDoc(collection(db, 'todos'), { text: newTodo, completed: false });
    setNewTodo('');
    fetchTodos();
  };

  const handleToggle = async (id, currentStatus) => {
    await updateDoc(doc(db, 'todos', id), { completed: !currentStatus });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    fetchTodos();
  };

  return (
    <div className="neo-card" style={{ backgroundColor: 'var(--accent)' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Tasks to Conquer</h2>
      <form className="todo-form" onSubmit={handleAdd}>
        <input 
          className="neo-input" 
          style={{ marginBottom: 0 }}
          type="text" 
          value={newTodo} 
          onChange={e => setNewTodo(e.target.value)} 
          placeholder="What needs to be done?" 
        />
        <button className="neo-button" type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item" style={{ opacity: todo.completed ? 0.7 : 1 }}>
            <div className="todo-content">
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#666' : 'inherit'
              }}>
                {todo.text}
              </span>
            </div>
            <div className="todo-actions">
              <button 
                className={`neo-button ${todo.completed ? '' : 'secondary'}`} 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                onClick={() => handleToggle(todo.id, todo.completed)}
              >
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button 
                className="neo-button danger" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {todos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', border: '3px solid var(--text-dark)', borderRadius: '8px' }}>
            <p style={{ fontWeight: 'bold' }}>No tasks yet. Add one above! ✨</p>
          </div>
        )}
      </ul>
    </div>
  );
}
