'use client';

import React, { useState, useEffect } from 'react';

type Goal = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  status: 'not_completed' | 'achieved';
  photo?: string;
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    status: 'not_completed',
    photo: '',
  });

  async function fetchGoals() {
    const res = await fetch('/api/goals');
    if (res.ok) {
      const data = await res.json();
      setGoals(data);
    }
  }

  useEffect(() => {
    fetchGoals();
  }, []);

  async function addGoal(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    if (res.ok) {
      setForm({ name: '', description: '', price: '', currency: 'USD', status: 'not_completed', photo: '' });
      fetchGoals();
    }
  }

  async function deleteGoal(id: string) {
    const res = await fetch(`/api/goals?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchGoals();
  }

  async function toggleStatus(id: string, currentStatus: 'not_completed' | 'achieved') {
    const newStatus = currentStatus === 'not_completed' ? 'achieved' : 'not_completed';
    const res = await fetch('/api/goals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    if (res.ok) fetchGoals();
  }

  return (
    <div style={ { padding: 20 } }>
      <h1>Цілі користувача</h1>

      <form onSubmit={ addGoal } style={ { marginBottom: 20 } }>
        <input
          placeholder="Назва цілі"
          value={ form.name }
          onChange={ (e) => setForm({ ...form, name: e.target.value }) }
          required
        />
        <input
          placeholder="Опис"
          value={ form.description }
          onChange={ (e) => setForm({ ...form, description: e.target.value }) }
        />
        <input
          type="number"
          placeholder="Ціна"
          value={ form.price }
          onChange={ (e) => setForm({ ...form, price: e.target.value }) }
          required
        />
        <input
          placeholder="Валюта"
          value={ form.currency }
          onChange={ (e) => setForm({ ...form, currency: e.target.value }) }
          required
        />
        <button type="submit">Додати ціль</button>
      </form>

      <ul>
        {
          goals.map((goal) => (
            <li key={ goal.id } style={ { marginBottom: 10 } }>
              <b>{ goal.name }</b> — { goal.price } { goal.currency } — <i>{ goal.status }</i>
              <button onClick={ () => deleteGoal(goal.id) } style={ { marginLeft: 10 } }>
                  Видалити
              </button>
              <button onClick={ () => toggleStatus(goal.id, goal.status) } style={ { marginLeft: 10 } }>
                  Позначити { goal.status === 'not_completed' ? 'виконаною' : 'невиконаною' }
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
