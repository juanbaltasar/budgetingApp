
import React, { useState, useEffect } from 'react';
import BudgetForm from './components/BudgetForm';
import BudgetCharts from './components/BudgetCharts';
import ServiceList from './components/ServiceList';
import './App.css';

function App() {
  const [budget, setBudget] = useState({ salary: 0, services: [], expenses: [] });
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:4000/api';
  const fetchBudget = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/budget`);
    const data = await res.json();
    setBudget(data);
    setLoading(false);
  };

  const handleDeleteService = async (idx) => {
    await fetch(`${API_URL}/service/${idx}`, {
      method: 'DELETE',
    });
    fetchBudget();
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  return (
    <div className="container">
      <h1>Administrador de Presupuesto Personal</h1>
      <BudgetForm onUpdate={fetchBudget} />
      {!loading && (
        <ServiceList services={budget.services} onDelete={handleDeleteService} />
      )}
      {loading ? <p>Cargando...</p> : <BudgetCharts budget={budget} />}
    </div>
  );
}

export default App;
