const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4317;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbFile = path.join(__dirname, 'jaffacake.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the local JaffaCake SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS boxes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      platform TEXT,
      difficulty TEXT,
      ip TEXT,
      os TEXT,
      status TEXT DEFAULT 'In Progress',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>JaffaCake &mdash; CTF Tracker</title>
      <style>
        :root {
          --bg: #050807;
          --card: #0b1210;
          --border: #13261c;
          --green: #00ff66;
          --text: #a4f4c2;
          --muted: #4b8264;
        }
        body {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
          background-color: var(--bg);
          color: var(--text);
          margin: 0;
          padding: 40px 20px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
        }
        h1 {
          color: var(--green);
          border-bottom: 2px solid var(--green);
          padding-bottom: 10px;
          letter-spacing: -1px;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-left: 4px solid var(--green);
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
        }
        button {
          background: rgba(0, 255, 102, 0.1);
          color: var(--green);
          border: 1px solid var(--green);
          padding: 10px 20px;
          font-family: inherit;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.2s;
        }
        button:hover {
          background: var(--green);
          color: var(--bg);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🍰 JaffaCake // CTF Command Center</h1>
        <p>Lightweight, local-first tracker and write-up generator.</p>
        <div class="card">
          <h3>System Status: ONLINE</h3>
          <p>Database connected cleanly to SQLite. Zero bloat. Zero antivirus flags.</p>
          <button onclick="alert('JaffaCake is fully operational!')">Test Terminal Hook</button>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`JaffaCake server running at http://127.0.0.1:${PORT}`);
});
