#!/bin/sh

ssh -t yokeyari@memotube.xyz "source /etc/profile;docker-compose -f ~/memotube/A_2010/backend/docker-compose.yml logs"
exit 0
