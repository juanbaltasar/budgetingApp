import React from 'react';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetCharts = ({ budget }) => {
  const serviceLabels = budget.services.map(s => s.name);
  const serviceData = budget.services.map(s => s.amount);
  const expenseLabels = budget.expenses.map(e => e.name);
  const expenseData = budget.expenses.map(e => e.amount);

  const pieData = {
    labels: ['Sueldo', 'Servicios', 'Gastos'],
    datasets: [
      {
        data: [budget.salary, serviceData.reduce((a,b)=>a+b,0), expenseData.reduce((a,b)=>a+b,0)],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  const barData = {
    labels: [...serviceLabels, ...expenseLabels],
    datasets: [
      {
        label: 'Monto',
        data: [...serviceData, ...expenseData],
        backgroundColor: [...serviceLabels.map(()=> '#FFCE56'), ...expenseLabels.map(()=> '#FF6384')],
      },
    ],
  };

  return (
    <div className="charts-section">
      <h3>Resumen del Presupuesto</h3>
      <Pie data={pieData} />
      <h3>Servicios y Gastos</h3>
      <Bar data={barData} />
    </div>
  );
};

export default BudgetCharts;
