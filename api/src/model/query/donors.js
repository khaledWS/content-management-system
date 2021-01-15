const connection = require('../database/db_connection');

exports.getAllData = () => {
  const sql = {
    text: `SELECT * FROM donors`,
  }

  return connection.query(sql);
}

exports.addData = (email, amount) => {
    const sql = {
      text: `INSERT INTO donors(photo, title, date) VALUES ($1, $2, $3)`,
      values: [email, amount]
    }
  
    return connection.query(sql);
}

exports.editData = (email, amount, id) => {
    const sql = {
      text: `UPDATE donors SET photo = $1, title = $2, date = $3 WHERE id = $4`,
      values: [email, amount, id]
    }
  
    return connection.query(sql);
}

exports.deleteData = (id) => {
    const sql = {
      text: `DELETE FROM donors WHERE id = $1`,
      values: [id]
    }
  
    return connection.query(sql);
}