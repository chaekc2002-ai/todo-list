import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function StudentSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="neo-card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--secondary)' }}>Student Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          className="neo-input" 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="neo-input" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button className="neo-button secondary" type="submit" style={{ width: '100%' }}>Sign Up</button>
      </form>
    </div>
  );
}
