import React, { useState, useEffect } from 'react';

const BudgetForm = ({ onUpdate }) => {
  const [salary, setSalary] = useState('');
  const [service, setService] = useState('');
  const [serviceAmount, setServiceAmount] = useState('');
  const [expense, setExpense] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const API_URL = 'http://localhost:4000/api';

  const handleSalary = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/salary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ salary: Number(salary) })
    });
    setSalary('');
    onUpdate();
  };

  const handleService = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/service`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: service, amount: Number(serviceAmount) })
    });
    setService('');
    setServiceAmount('');
    onUpdate();
  };

  const handleExpense = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/expense`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: expense, amount: Number(expenseAmount) })
    });
    setExpense('');
    setExpenseAmount('');
    onUpdate();
  };

  return (
    <div className="form-section">
      <form onSubmit={handleSalary}>
        <h3>Ingresar Sueldo</h3>
        <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="Sueldo" required />
        <button type="submit">Guardar Sueldo</button>
      </form>
      <form onSubmit={handleService}>
        <h3>Agregar Servicio Regular</h3>
        <input type="text" value={service} onChange={e => setService(e.target.value)} placeholder="Servicio" required />
        <input type="number" value={serviceAmount} onChange={e => setServiceAmount(e.target.value)} placeholder="Monto" required />
        <button type="submit">Agregar Servicio</button>
      </form>
      <form onSubmit={handleExpense}>
        <h3>Agregar Gasto Ocasional</h3>
        <input type="text" value={expense} onChange={e => setExpense(e.target.value)} placeholder="Gasto" required />
        <input type="number" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} placeholder="Monto" required />
        <button type="submit">Agregar Gasto</button>
      </form>
      <hr style={{margin: '2em 0'}} />
      <p style={{fontSize: '0.9em', color: '#888'}}>Esta app es una PWA. Puedes instalarla en tu dispositivo móvil desde el navegador.</p>
    </div>
  );
};

export default BudgetForm;
