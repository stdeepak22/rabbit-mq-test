#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# trigger the rabbitmq-server in the background
rabbitmq-server &

sleep 2
echo "[entry] Waiting for RabbitMQ to start..."
until rabbitmqctl status 2>/dev/null | grep "OS PID"; do
  sleep 1
done


echo "[entry] Lets check and join the RabbitMQ cluster..."
# run script to join cluster
# and this path should be the same as the one we configured in docker compose volume
/etc/local_config/join_cluster.sh
echo "[entry] Cluster check and join completed!"

# Keep the container running, its important otherwise the container will stop,
# as docker-entrypoint.sh is not running in the foreground line #2
wait