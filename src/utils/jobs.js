const cron = require('node-cron');
const emailService = require('../services/email-service');

const setupJobs = () => {
  cron.schedule('* * * * *', async () => {
    console.log('done');
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      emailService.sendBasicEmail(
        'ReminderService@admin.com',
        email.recepientEmail,
        email.subject,
        email.content
      )
    });
    console.log(response);
    return response;
  });
}

module.exports = setupJobs;