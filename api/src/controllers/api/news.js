const newsQuery = require('../../model/query/news');

exports.getAllNews = async (req, res) => {
    const allNews = await newsQuery.getAllNews().then(d => d.rows);
    res.send(allNews);
}

exports.addNews = async (req, res) => {
    const { photo, title, date } = req.body
    const insertedNews = await newsQuery.addNews(photo, title, date).then(d => d.rows).catch(err => err);
    res.send(insertedNews);
}

exports.editNews = async (req, res) => {
    const { photo, title, date, id } = req.body
    const editedNews = await newsQuery.editNews(photo, title, date, id).then(d => d.rows).catch(err => { res.status(500); return err });
    res.send(editedNews);
}

exports.deleteNews = async (req, res) => {
    const { id } = req.body
    const deletedNews = await newsQuery.deleteNews(id).then(d => d.rows).catch(err => err);
    res.send(deletedNews);
}