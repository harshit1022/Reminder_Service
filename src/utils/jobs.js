const cron = require('node-cron');
const { sender } = require('../config/emailConfig');
const emailService = require('../services/email-service');

const setupJobs = () => {
  cron.schedule('* * * * *', async () => {
    console.log('done');
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail({
        to: email.recepientEmail,
        subject: email.subject,
        text: email.content
      }, async (err, res) => {
        if(err) {
          console.log(err);
        }
        else {
          console.log(res);
          emailService.update(email.id, {status: 'SUCCESS'});
        }
      })
    });
    console.log(response);
    return response;
  });
}

module.exports = setupJobs;