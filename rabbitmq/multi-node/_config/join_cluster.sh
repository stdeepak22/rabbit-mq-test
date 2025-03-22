
if [ -n "$JOIN_CLUSTER" ]; then
    echo "Joining RabbitMQ cluster with $JOIN_CLUSTER..."
    rabbitmqctl stop_app
    rabbitmqctl join_cluster $JOIN_CLUSTER || true
    rabbitmqctl start_app
else
    echo "Starting standalone RabbitMQ node..."
fi