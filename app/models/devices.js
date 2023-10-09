'use strict';
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

async function getList(enterprise_id, page = 1) {
  const offset = (page - 1) * config.listPerPage;

  // Use a parameterized query to prevent SQL injection
  const sql = `SELECT * FROM devices WHERE enterprise_id = ? LIMIT ? OFFSET ?`;
  const params = [enterprise_id, config.listPerPage, offset];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data: rows, meta: { page } });
      }
    });
  });
}

async function getDetails(id, columns = '*') {
  // Use a parameterized query to prevent SQL injection
  const sql = `SELECT ${columns} FROM devices WHERE id = ?`;
  const params = [id];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data: helper.emptyOrRows(rows[0]), code: 1001 });
      }
    });
  });
}

async function getDeviceDetailsByPram(column_name, column_val, columns = '*') {
  // Use a parameterized query to prevent SQL injection
  const sql = `SELECT ${columns} FROM devices WHERE ${column_name} = ?`;
  const params = [column_val];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data: helper.emptyOrRows(rows[0]), code: 1001 });
      }
    });
  });
}

async function update(id, title, body, enroll_url) {
  // Use a parameterized query to prevent SQL injection
  const sql = `UPDATE devices SET name = ?, policy_data = ?, enroll_url = ? WHERE id = ?`;
  const params = [title, JSON.stringify(body), enroll_url, id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Record has been updated' });
      }
    });
  });
}

async function updateData(id, body, status) {
  // Use a parameterized query to prevent SQL injection
  const sql = `UPDATE devices SET device_data = ?, status = ? WHERE id = ?`;
  const params = [JSON.stringify(body), status, id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Record has been updated' });
      }
    });
  });
}

async function create(title, body, enroll_url, enterprise_id) {
  // Use a parameterized query to prevent SQL injection
  const sql = `INSERT INTO devices (name, device_id, enterprise_id) VALUES (?, ?, ?)`;
  const params = [title, JSON.stringify(body), enterprise_id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Record has been created' });
      }
    });
  });
}

async function deleteRecord(id) {
  // Use a parameterized query to prevent SQL injection
  const sql = `DELETE FROM devices WHERE id = ?`;
  const params = [id];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Record has been deleted' });
      }
    });
  });
}

async function insertNewlist(body, enterprise_id) {
  // First, delete existing records for the given enterprise
  await deleteRecordsByEnterpriseId(enterprise_id);

  // Use a parameterized query to insert new records
  const sql = `INSERT INTO devices (name, enterprise_id, mdm_device_id) VALUES ${body}`;

  return new Promise((resolve, reject) => {
    db.run(sql, [], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Records have been inserted' });
      }
    });
  });
}

// Add a function to delete records by enterprise_id
async function deleteRecordsByEnterpriseId(enterprise_id) {
  const sql = `DELETE FROM devices WHERE enterprise_id = ?`;
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

async function insertNewDevice(body, enterprise_id) {
  // Use a parameterized query to insert a new device
  const sql = `INSERT INTO devices (name, enterprise_id, mdm_device_id, device_data, status) VALUES (?, ?, ?, ?, ?)`;
  const params = [body.name, enterprise_id, body.mdm_device_id, JSON.stringify(body.device_data), body.status];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: 'Record has been inserted' });
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
  getDeviceDetailsByPram,
  updateData,
  insertNewDevice,
};
