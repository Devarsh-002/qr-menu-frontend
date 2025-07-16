import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', { ...form, role: 'customer' });
    alert('Registered! Please log in.');
    navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-green-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Customer Register</h2>
        <input type="text" className="border p-2 w-full mb-2" onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input type="email" className="border p-2 w-full mb-2" onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <input type="password" className="border p-2 w-full mb-4" onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
        <button className="bg-green-600 text-white px-4 py-2 w-full rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
