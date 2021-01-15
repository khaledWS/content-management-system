const connection = require('../database/db_connection');

exports.getAllNews = () => {
  const sql = {
    text: `SELECT * FROM news`,
  }

  return connection.query(sql);
}

exports.addNews = (photo, title, date) => {
    const sql = {
      text: `INSERT INTO news(photo, title, date) VALUES ($1, $2, $3)`,
      values: [photo, title, date]
    }
  
    return connection.query(sql);
}

exports.editNews = (photo, title, date, id) => {
    const sql = {
      text: `UPDATE news SET photo = $1, title = $2, date = $3 WHERE id = $4`,
      values: [photo, title, date, id]
    }
  
    return connection.query(sql);
}

exports.deleteNews = (id) => {
    const sql = {
      text: `DELETE FROM news WHERE id = $1`,
      values: [id]
    }
  
    return connection.query(sql);
}