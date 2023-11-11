const { sender } = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');

const ticketRepository = new TicketRepository();

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  sender.sendMail({
    to: mailTo,
    from: mailFrom,
    subject: mailSubject,
    text: mailBody
  });
}

const fetchPendingEmails = async (timestamp) => {
  try {
    console.log("Reached");
    const mails = await ticketRepository.get({status: 'PENDING'});
    return mails;  
  } catch (error) {
    console.log(error);
  }
}

const createNotification = async (data) => {
  try {
    const response = ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const update = async (ticketId, data) => {
  try {
    const response = ticketRepository.update(ticketId, {status: data.status});
    return response;
  } catch (error) {
    console.log(error);
  }
}

const subscribeEvent = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch(service) {
    case 'CREATE_TICKET' :
      await createNotification(data);
      break;
    case 'SEND_BASIC_EMAIL' :
      await sendBasicEmail(data);
      break;
    default:
      console.log('No service received');
  }
}

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  update,
  subscribeEvent
}