#!/bin/sh

curl -X POST -d @payload.txt ${HOST_URL:-localhost}:8080
