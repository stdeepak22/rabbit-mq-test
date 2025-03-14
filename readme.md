# RabbitMQ Test

This repository contains a test setup for RabbitMQ. The project is structured into three main folders:

1. **RabbitMQ**: This folder contains the Docker compose files for RabbitMQ, single node, and multi for cluster.
2. **Consumer**: This folder contains the code and scripts for the consumer that listens to the RabbitMQ messages.
3. **Producer**: This folder contains the code and scripts for the producer that sends messages to RabbitMQ.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
    - used to run RabbitMQ docker image.
- [Node.js](https://nodejs.org/) installed  - if using producer/consumer from this repo for testing.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/stdeepak22/rabbit-mq-test.git
    cd rabbit-mq-test
    ```

2. Navigate to each folder(producer and consumer) and install dependencies if using these producer/consumer for testing:
    ```sh
    cd consumer
    npm install

    cd ../producer
    npm install
    ```

### Running the Project

1. Start RabbitMQ server using Docker:
    ```sh
    cd rabbitmq
    docker-compose up -d
    ```
2. Run the consumer to receive messages:
    ```sh
    cd ../consumer
    npm start
    ```
3. Run the producer to send messages:
    ```sh
    cd ../producer
    npm start
    ```
    this will produce 1 message every 2 seconds, but while starting you can pass extra argument to produce more messages.
    
    eg. to produce 1 message every second
    ```sh
    cd ../producer
    npm start 1000
    ```
    or to produce 10 seconds every second.
    ```sh
    cd ../producer
    npm start 100
    ```

    3rd argument is gap in between in miliseconds. default is 2000 (2seconds) 

If we are running multiple producers, and single consumer, lets see how it will work - more load on consumer, as it has to process and consume messages produced by both producers.

When we have multiple consumers, in that case, they will pick 1-by-1, from Queue (produced by any number of producers) eg. if we have two consumers, they will pick message from Queue 1-by-1, so may be all even position messages will go to one consumer, and all odd will go to other, while this all is running smootly, if any consumer stopped (killed, or exited), single consumer will consumer all the messages from Queue.

## Folder Structure

```
rabbit-mq-test/
├── rabbitmq/
│   ├── single-node/
│   │   └── (Docker compose and entry file for creating user/permissions)
│   └── multi-node/ ⚠️⚠️ coming soon
│       └── (docker compose and entry file for cluster, and creating user/permission)
├── consumer/
│   └── (Consumer code and scripts)
└── producer/
    └── (Producer code and scripts)
```

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
