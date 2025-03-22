import { connect } from 'amqplib';

// user 'consumer' is created when starting docker container with password, file: create_user.sh
// this user must have read permissions on the queue
const RABBITMQ_URL = 'amqp://consumer:consumer-password@localhost?frameMax=0x2000';

const QUEUE_NAME = 'test_queue';


async function startAndConsume() {
    try {
        console.log(`🌀 Connecting to RabbitMQ`);
        const channelModel = await connect(RABBITMQ_URL);
        console.log(`🟢 Connected to RabbitMQ`);
        const channel = await channelModel.createChannel();

        console.log(`Consuming messages from ${QUEUE_NAME}. To exit press CTRL+C`);

        await channel.assertQueue(QUEUE_NAME);

        channel.consume(QUEUE_NAME, (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                console.log(`⬇️  Received: [id(${message.id}) - timestamp(${message.timestamp})]`);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error(`Error: ${error}`, error);
        process.exit(1);
    }
}

startAndConsume();