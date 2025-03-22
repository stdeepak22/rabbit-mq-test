
# Create user 'producer' with password 'producer-password'
if rabbitmqctl list_users | grep producer 1>/dev/null; then
    echo "[create_user.sh] 'producer' already exists"
else
    rabbitmqctl add_user producer producer-password
    # Set permissions for 'producer' user, can configure and write to the queue, and default exchange, but no read permissions
    rabbitmqctl set_permissions -p / producer "$QUEUE_NAME" "$QUEUE_NAME|amq.default" ""
    echo "[create_user.sh] 'producer' has been created"
fi


# Create user 'consumer' with password 'consumer-password'
if rabbitmqctl list_users | grep consumer 1>/dev/null; then
    echo "[create_user.sh] 'consumer' already exists"
else
    rabbitmqctl add_user consumer consumer-password
    # Set permissions for 'consumer' user, can configure and read from the queue, but no write permissions
    # configure permission so 1st time if no queue is there, it can create.
    rabbitmqctl set_permissions -p / consumer "$QUEUE_NAME" "" "$QUEUE_NAME"
    echo "[create_user.sh] 'consumer' has been created"
fi
