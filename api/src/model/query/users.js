const connection = require('../database/db_connection');

exports.getAllData = () => {
  const sql = {
    text: `SELECT * FROM users`,
  }

  return connection.query(sql);
}