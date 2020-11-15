#!/bin/sh

ssh yokeyari@memotube.xyz "~/.local/bin/docker-compose -f ~/memotube/A_2010/backend/docker-compose.yml exec rails bash"
exit 0
