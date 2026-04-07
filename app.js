const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function connectWithRetry() {
  for (let i = 0; i < 10; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to database');
      return;
    } catch (err) {
      console.log(`Waiting for database... attempt ${i + 1}`);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  throw new Error('Could not connect to database');
}

app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks');
  res.json(result.rows);
});

app.post('/tasks', async (req, res) => {
  const { name, status } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *',
    [name, status]
  );
  res.json(result.rows[0]);
});

connectWithRetry().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
