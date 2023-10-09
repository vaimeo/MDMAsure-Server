const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;

  // Use a parameterized query to prevent SQL injection
  const sql = `SELECT * FROM users LIMIT ? OFFSET ?`;
  const params = [config.listPerPage, offset];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        // Reject the promise with the error
        reject(err);
      } else {
        // Resolve the promise with the query result (rows)
        const data = helper.emptyOrRows(rows);
        const meta = { page };
        resolve({ data, meta });
      }
    });
  });
}

async function checkCredentials(username, password) {
  // Use a parameterized query to prevent SQL injection
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  const params = [username, password];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        // Reject the promise with the error
        reject(err);
      } else {
        // Resolve the promise with the query result (rows)
        resolve({ data: rows });
      }
    });
  });
}

module.exports = {
  getMultiple,
  checkCredentials
}