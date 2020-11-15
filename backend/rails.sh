#!/bin/sh

ssh -t yokeyari@192.168.0.105 "source /etc/profile;docker-compose -f ~/memotube/A_2010/backend/docker-compose.yml exec web bash"
exit 0
