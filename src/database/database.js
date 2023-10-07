const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

async function createTablePost(db) {
  db.run(`
  CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  msg TEXT
  )`);
}

function database() {
  return new sqlite3.Database('./database/database.db')
}

function initialize() {
  db.serialize(async () => {
    await createTablePost(db);
    db.close()
  })
}
initialize();

module.exports = {
  database
}