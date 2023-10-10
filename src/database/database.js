const sqlite3 = require('sqlite3').verbose();

function database() {
  return new sqlite3.Database('./database/database.db');
}

async function createTablePost() {
  const db = database();
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userID TEXT,
      msg TEXT,
      hora TEXT,
      chatID TEXT
      )`);
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT,
      name TEXT,
      email TEXT,
      password TEXT
      )`)
    db.run(`
      CREATE TABLE IF NOT EXISTS chat (
      id INT,
      UID1 INT,
      UID2 INT
      )`)
  });
}

async function initialize() {
  try {
    await createTablePost();
    console.log('Database table created successfully.');
  } catch (error) {
    console.error('Error creating database table:', error);
  }
}

initialize();

module.exports = {
  database
};