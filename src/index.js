const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const { sendBasicEmail } = require('./services/email-service');

const startServer = () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api', apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);

    sendBasicEmail(
      'support@admin.com',
      'hp982601@gmail.com',
      'Testing',
      'Sending this mail using Nodemailer Package'
    )
  });
}


startServer();