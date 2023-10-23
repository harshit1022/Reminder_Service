const nodemailer = require('nodemailer');

const { EMAIL_ID, EMAIL_PASS } = require('./serverConfig')

const sender = nodemailer.createTransport({
  host: 'Gmail',
  auth: {
    user: EMAIL_ID,
    password: EMAIL_PASS
  }
});

module.exports = {
  sender
}