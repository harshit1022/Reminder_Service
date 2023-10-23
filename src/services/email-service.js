const { sender } = require('../config/emailConfig');

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  sender.sendMail({
    to: mailTo,
    from: mailFrom,
    subject: mailSubject,
    text: mailBody
  });
}

module.exports = {
  sendBasicEmail
}