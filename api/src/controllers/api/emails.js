require('env2')('./config.env');
const nodemailer = require('nodemailer');
const usersQuery = require('../../model/query/users');

const sendEmails = async (req, res) => {
    // console.log(req.body);
    let emails = req.body.emails ? [req.body.emails] : [];
    const { subject, text } = req.body;
    if (!emails.length) {
        emails = await (await usersQuery.getAllData().then(d => d.rows)).map(e => e.email);
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'tamkeen.jizan2@gmail.com',
            pass: `${process.env.PASSWORD}`,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    emails.map(to => {
        const HelperOptions = {
            from: 'tamkeen.jizan2@gmail.com',
            to,
            subject,
            text,
        };


        transporter.sendMail(HelperOptions, (error) => {
            if (error) {
                return console.log(error);
            }
            return true;
        });
    })

    res.send(JSON.stringify({ response: 'Message sent successfully' }));
};


module.exports = { sendEmails };