const { sender } = require('../config/emailConfig');

const sendBasicEmail = (from, to, mailSubject, mailBody) => {
  sender.sendMail({

  });
}

module.exports = {
  sendBasicEmail
}