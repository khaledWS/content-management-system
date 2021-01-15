const statsQuery = require('../../model/query/stats');

exports.getStats = async (req, res) => {
    const allData = await statsQuery.getAllData().then(d => d.rows);
    res.send(allData);
}

exports.editStats = async (req, res) => {
    console.log('REQ BODY', req.body)
    const { families_ben, orphans, employees, families_prod, revenues, expenses, facebook, instagram, twitter } = req.body
    const editedData = await statsQuery.editData(families_ben, orphans, employees, families_prod, revenues, expenses, facebook, instagram, twitter).then(d => d.rows).catch(err => { console.log(err); res.status(500); return err });
    res.send(editedData);
}