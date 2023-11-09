const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const EmailService = require('./services/email-service');
const apiRoutes = require('./routes/index');
const {PORT} = require('./config/serverConfig');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig')
const { createChannel, subscribeMsg } = require('./utils/messageQueue');

//const { sendBasicEmail } = require('./services/email-service');
//const Jobs = require('./utils/jobs');

const startServer = async () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api', apiRoutes);

  const channel = await createChannel();
  subscribeMsg(channel, EmailService.testingQueue, REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);

    //Jobs();

    // sendBasicEmail(
    //   'support@admin.com',
    //   'harshitpatel1022@gmail.com',
    //   'Testing',
    //   'Sending this mail using Nodemailer Package'
    // )
  });
}


startServer();