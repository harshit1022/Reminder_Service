const amqplib = require('amqplib');

const createChannel = async () => {
  try {
    // connecting to RabbitMQ channel
    const connection = await amqplib.connect(MSG_BROKER_URL);
    // creating channel
    const channel = await connection.createChannel();
    // setting up the distributor
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
    return channel;
  } 
  catch (error) {
    throw error;
  }
}

const subscribeMsg = async(channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue(QUEUE_NAME);

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, msg => {
      console.log('received data');
      console.log(msg.content.toString()); // printing the msg
      channel.ack(msg); // acknowledging that msg is consumed by subscriber
    });
  } 
  catch (error) {
    throw error;
  }
}

const publishMsg = async () => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } 
  catch (error) {
    throw error;    
  }
}

module.exports = {
  createChannel,
  subscribeMsg,
  publishMsg
}