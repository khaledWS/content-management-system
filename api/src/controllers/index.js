const express = require('express');

const router = express.Router();
const cors = require('cors')

const verifyCookie = require('./verifycookie');
const homepage = require('./homepage');
const contact = require('./contact');
const news = require('./news');
const users = require('./users');
const login = require('./login');
const content = require('./content');
const addNews = require('./addNews');
const logout = require('./logout');
const notifications = require('./notifications');
const sendNotification = require('./sendNotification');
const newsAPI = require('./api/news');
const donorsAPI = require('./api/donors');
const statsAPI = require('./api/stats');
const usersAPI = require('./api/users');
const emailsAPI = require('./api/emails');


router.use(cors())


router.get('/', verifyCookie, homepage.showHomepage)
      .get('/news', verifyCookie, news.showNews)
      .get('/users', verifyCookie, users.showUsers)
      .get('/login', login.showLogin)
      .post('/login', login.postLogin)
      .get('/logout', verifyCookie, logout.logout)
      .get('/contact', verifyCookie, contact.showContact)
      .get('/content', verifyCookie, content.showContent)
      .get('/notifications', verifyCookie, notifications.showNotifications)
      .get('/sendNotification', verifyCookie, sendNotification.showSendNotification)
      .get('/addNews', verifyCookie, addNews.addNews)

      .get('/api/getAllUsers', verifyCookie, usersAPI.getAllUsers)

      .get('/api/getNews', newsAPI.getAllNews)
      .post('/api/addNews', verifyCookie, newsAPI.addNews)
      .post('/api/editNews', verifyCookie, newsAPI.editNews)
      .post('/api/deleteNews', verifyCookie, newsAPI.deleteNews)

      .get('/api/getDonors', verifyCookie, donorsAPI.getAllDonors)
      .post('/api/addDonors', donorsAPI.addDonors)
      .post('/api/deleteDonor', verifyCookie, donorsAPI.deleteDonors)

      .get('/api/getStats', statsAPI.getStats)
      .post('/api/editStats', verifyCookie, statsAPI.editStats)
      .post('/api/sendEmails', verifyCookie, emailsAPI.sendEmails)
module.exports = router;
