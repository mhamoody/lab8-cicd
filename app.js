const express = require('express');
const os = require('os');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// MySQL connection pool — reads config from environment variables
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'lab6',
  waitForConnections: true,
  connectionLimit: 10,
});

// Route 1: basic info
app.get('/', (req, res) => {
  res.json({
    app:  'CISC 886 Lab 6',
    mode: process.env.MODE || 'local',
    node: process.version,
    host: os.hostname(),
  });
});

// Route 2: tasks grouped by status — now fetched from MySQL
app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks');

    // Replicate the original Object.groupBy behaviour
    const grouped = rows.reduce((acc, task) => {
      (acc[task.status] = acc[task.status] || []).push(task);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log('--------------------------------------------------');
  console.log(`  CISC 886 Lab 6 — App started`);
  console.log(`  Port:  ${PORT}`);
  console.log(`  Mode:  ${process.env.MODE || 'local'}`);
  console.log(`  Node:  ${process.version}`);
  console.log(`  Host:  ${os.hostname()}`);
  console.log('--------------------------------------------------');
});
