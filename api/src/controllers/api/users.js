const usersQuery = require('../../model/query/users');

exports.getAllUsers = async (req, res) => {
    const allData = await usersQuery.getAllData().then(d => d.rows);
    res.send(allData);
}