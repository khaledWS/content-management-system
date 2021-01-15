const hashpassword = require('./password.js');
const auth = require('../model/query/auth.js');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');


 const showLogin= (req, res) => {
  res.render('login', {layout: false});
}

const postLogin = (req, res) => {
  const { email,password } = req.body;
  auth.selectData(email, (err, data) => {
    if (err) {
      res.render('error');
    } else if (data.length == 0) {
      res.render('login', {
        layout: false,
        err: true,
        msg: 'This user does not exist'
      });
    } else {

      hashpassword.comparePassword(password, data[0].password, (err, isTrue) => {
        if (isTrue) {
          console.log('Login Success');
          const userData = {
            id: data[0].id,
            username: data[0].username,
            role: data[0].role
          }
          const token = jwt.sign(userData, process.env.SECRET_KEY);
          res.cookie('accessToken', token).redirect('/');
        } else {
          console.log('Login Failed');
          res.render('login', {
            layout: false,
            err: true,
            msg: 'Password is not correct'
          });
        }
      });
    }
  })
}


module.exports = { showLogin , postLogin };
