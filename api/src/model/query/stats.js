const connection = require('../database/db_connection');

exports.getAllData = () => {
  const sql = {
    text: `SELECT * FROM stats`,
  }

  return connection.query(sql);
}

exports.editData = (families_ben, orphans, employees, families_prod, revenues, expenses, facebook, instagram, twitter) => {
    const sql = {
      text: `UPDATE stats SET families_ben = $1, orphans = $2, employees = $3, families_prod = $4, revenues = $5, expenses = $6, facebook = $7, instagram = $8, twitter = $9 WHERE id = 1`,
      values: [families_ben, orphans, employees, families_prod, revenues, expenses, facebook, instagram, twitter]
    }
  
    return connection.query(sql);
}