<<<<<<< HEAD
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
=======
const sqlite3 = require('sqlite3').verbose();

function database() {
  return new sqlite3.Database('./src/database/database.db');
}

async function createTablePost() {
  const db = database();
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        msg TEXT
      )`, (err) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
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
  database,
};
>>>>>>> 880909271118ae4afd854307ed190a83b3a99003
