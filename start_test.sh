#!/bin/bash

# start test services
docker-compose -f docker-compose.test.yml up -d --build
