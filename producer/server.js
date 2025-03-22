import { connect } from 'amqplib';

// user 'producer' is created when starting docker container with password, file: create_user.sh
// this user must have write permissions on the queue, as well as on amq.default exchange, because when
// we send a message to a queue, it is actually sent to the default exchange with the queue name as routing key
const RABBITMQ_URL = 'amqp://producer:producer-password@localhost?frameMax=0x2000';
const QUEUE_NAME = 'test_queue';

let timeout = 2000;
if (process.argv.length > 2) {
    timeout = parseInt(process.argv[2]);
    if (isNaN(timeout)) {
        console.warn(`Invalid timeout value: ${process.argv[2]}`);
        timeout = 2000;
    }
}
async function startAndPost() {
    try {
        console.log(`🌀 Connecting to RabbitMQ`);
        const channelModel = await connect(RABBITMQ_URL);
        console.log(`🟢 Connected to RabbitMQ`);
        const channel = await channelModel.createChannel();
        console.log(`Sending messages to ${QUEUE_NAME}. To exit press CTRL+C`);

        await channel.assertQueue(QUEUE_NAME);
        let counter = 0;
        setInterval(() => {
            counter++;
            const message = {
                id: counter,
                timestamp: new Date().toISOString()
            };
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
            console.log(`✅ Sent: [id(${message.id}) - timestamp(${message.timestamp})]`);
        }, timeout);

    } catch (error) {
        console.error(`Error: ${error}`, error);
        process.exit(1);
    }
}

startAndPost();