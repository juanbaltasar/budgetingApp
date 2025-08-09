
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'budget.json');

function loadBudget() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { salary: 0, services: [], expenses: [] };
  }
}

function saveBudget(budget) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(budget, null, 2));
}

let budget = loadBudget();


app.get('/api/budget', (req, res) => {
  budget = loadBudget();
  res.json(budget);
});


app.post('/api/salary', (req, res) => {
  budget.salary = req.body.salary;
  saveBudget(budget);
  res.json({ success: true });
});


app.post('/api/service', (req, res) => {
  budget.services.push(req.body);
  saveBudget(budget);
  res.json({ success: true });
});



app.post('/api/expense', (req, res) => {
  budget.expenses.push(req.body);
  saveBudget(budget);
  res.json({ success: true });
});


app.delete('/api/service/:idx', (req, res) => {
  const idx = parseInt(req.params.idx);
  if (!isNaN(idx) && idx >= 0 && idx < budget.services.length) {
    budget.services.splice(idx, 1);
    saveBudget(budget);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Índice inválido' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
