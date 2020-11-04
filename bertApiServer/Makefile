APP_SERVER_TAG = debian:app-server
WEB_SERVER_TAG = centos:web-server

build:
	docker-compose -f deployment/docker-compose/docker-compose.yaml build --no-cache

run_foreground: build
	docker-compose -f deployment/docker-compose/docker-compose.yaml up

run_background: build
	docker-compose -f deployment/docker-compose/docker-compose.yaml up -d

stop:
	docker-compose -f deployment/docker-compose/docker-compose.yaml stop

restart:
	docker-compose -f deployment/docker-compose/docker-compose.yaml restart

clean:
	docker-compose -f deployment/docker-compose/docker-compose.yaml down

clean_all:
	docker-compose -f deployment/docker-compose/docker-compose.yaml down --rmi all -v

# ファイルを作成しないことを事前にmakeへ通知
.PHONY: run_foreground run_background clean clean_all stop restart
