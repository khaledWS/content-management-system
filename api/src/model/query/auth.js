const connection = require('../database/db_connection');
const selectData = (email, cb) => {
  const sql = {
    text: `SELECT * FROM users WHERE email = $1`,
    values: [email]
  }
  connection.query(sql, (err, data) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, data.rows);
    }
  });
}

const selectUser = (username, cb) => {
  const sql = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [username]
  }
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
}






const postAddUser = (username, email, password, cb) => {
  const sql = {
    text:'INSERT INTO  users(username, email, password) VALUES ($1, $2, $3) RETURNING id',
    values:[username, email, password]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
}
module.exports = {
  selectData , postAddUser , selectUser
};
