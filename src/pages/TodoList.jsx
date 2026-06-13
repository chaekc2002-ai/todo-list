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
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleAdd}>
        <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Add a new task" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => handleToggle(todo.id, todo.completed)}>Toggle</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
