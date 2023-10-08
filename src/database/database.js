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
