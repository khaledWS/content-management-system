const donorsQuery = require('../../model/query/donors');

exports.getAllDonors = async (req, res) => {
    const allData = await donorsQuery.getAllData().then(d => d.rows);
    res.send(allData);
}

exports.addDonors = async (req, res) => {
    const { email, amount } = req.body
    const insertedData = await donorsQuery.addData(email, amount).then(d => d.rows).catch(err => err);
    res.send(insertedData);
}

exports.editDonors = async (req, res) => {
    const { email, amount, id } = req.body
    const editedData = await donorsQuery.editData(email, amount, id).then(d => d.rows).catch(err => { res.status(500); return err });
    res.send(editedData);
}

exports.deleteDonors = async (req, res) => {
    const { id } = req.body
    const deletedData = await donorsQuery.deleteData(id).then(d => d.rows).catch(err => err);
    res.send(deletedData);
}