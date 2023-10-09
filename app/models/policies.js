'use strict';
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

async function getList(enterprise_id, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  // Use a parameterized query to prevent SQL injection
  const sql = `SELECT * FROM policies WHERE enterprise_id = ? LIMIT ? OFFSET ?`;
  const params = [enterprise_id, config.listPerPage, offset];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const data = helper.emptyOrRows(rows);
        const meta = { page };
        resolve({ code: 1001, data, meta });
      }
    });
  });
}

async function getDetails(id, columns = '*') {
  // Use a parameterized query to prevent SQL injection
  const sql = `SELECT ${columns} FROM policies WHERE id = ?`;
  const params = [id];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        console.log('rows=', rows);
        const data = helper.emptyOrRows(rows[0]);
        resolve({ data, code: 1001 });
      }
    });
  });
}

async function update(id, title, body, enroll_url) {
  // Use a parameterized query to prevent SQL injection
  const sql = `UPDATE policies SET name = ?, policy_data = ?, enroll_url = ? WHERE id = ?`;
  const params = [title, JSON.stringify(body), enroll_url, id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log('update=', this.changes);
        resolve({ message: 'Record has been updated' });
      }
    });
  });
}

async function create(title, body, enroll_url, enterprise_id, id = 0) {
  var rows = '';
  if (id > 0) {
    // Update existing record
    const sql = `UPDATE policies SET name = ?, policy_data = ?, enroll_url = ? WHERE id = ?`;
    const params = [title, JSON.stringify(body), enroll_url, id];
    rows = await db.run(sql, params);
  } else {
    // Insert new record
    const sql = `INSERT INTO policies (name, policy_data, enroll_url, enterprise_id, mdm_policy_id) VALUES (?, ?, ?, ?, ?)`;
    const params = [title, JSON.stringify(body), enroll_url, enterprise_id, body.name];
    rows = await db.run(sql, params);
  }

  console.log('update=', rows);
  return {
    message: 'Record has been updated',
    enroll_url: enroll_url,
    code: 1001,
  };
}

async function insertNewlist(body, enterprise_id) {
  // First, delete existing records for the given enterprise
  await deleteRecordsByEnterpriseId(enterprise_id);

  // Use a parameterized query to insert new records
  const sql = `INSERT INTO policies (name, enterprise_id, mdm_policy_id, policy_data) VALUES ${body}`;

  return new Promise((resolve, reject) => {
    db.run(sql, [], function (err) {
      if (err) {
        reject(err);
      } else {
        console.log('insert=', this.changes);
        resolve({ message: 'Records have been inserted' });
      }
    });
  });
}

// Add a function to delete records by enterprise_id
async function deleteRecordsByEnterpriseId(enterprise_id) {
  const sql = `DELETE FROM policies WHERE enterprise_id = ?`;
  const params = [enterprise_id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function deleteRecord(id) {
  // Use a parameterized query to prevent SQL injection
  const sql = `DELETE FROM policies WHERE id = ?`;
  const params = [id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log('update=', this.changes);
        resolve({ message: 'Record has been updated' });
      }
    });
  });
}

module.exports = {
  getList,
  getDetails,
  update,
  create,
  insertNewlist,
  deleteRecord,
};
