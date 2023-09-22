const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * from users LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function checkCredentials(username,password){
    const rows = await db.query(
      `SELECT * from users where username=? and password = ?`, 
      [username, password]
    );
    const data = helper.emptyOrRows(rows);
    return {
      data
    }
  }


module.exports = {
  getMultiple,
  checkCredentials
}