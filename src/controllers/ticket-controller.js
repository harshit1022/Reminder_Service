const TicketService = require('../services/email-service');

const create = async(req, res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return res.status(201).json({
      message: 'Successfully registered email service',
      data: response,
      err: {},
      success: true
    })
  } 
  catch (error) {
    return res.status(500).json({
      message: 'Not able to register email service',
      data: {},
      err: error,
      success: false
    })
  }
}

module.exports = {
  create
}