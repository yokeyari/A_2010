# 概要
以下の練習を行うためのリポジトリ。
※ApplicationサーバはFlaskで作成。このサーバの処理内容はhealthチェックAPIくらいしか持たない(この部分はこのリポジトリのコア目的ではないため)
1. Nginx+Gunicorn(uWSGI)にてWebサーバ+APPサーバの構成をローカルで立ち上げられるようにする。[Completed]
2. 1の設定をheroku上でデプロイ。[Skip]
3. Webサーバ、APPサーバをDocker化。[Completed]
4. 3をdocker-composeで管理[Now]
5. DBサーバ(PostgresSQL)をかませる。[Order Changed]
6. Ansible等を利用してさらなる管理効率化。

# Commands

* make build - app-server、web-serverコンテナイメージをビルド
* make run_foreground     - appサーバ、webサーバのコンテナをdocker-composeにて`Foreground`起動
* make run_background     - appサーバ、webサーバのコンテナをdocker-composeにて`Background`起動
* make stop - コンテナを停止
* make restart - コンテナを再起動
* make run_app - appサーバコンテナを起動
* make clean - コンテナとネットワークを削除
* make clean_all - コンテナ、ネットワーク、イメージ、ボリュームを削除

# Tips
## docker-compose
1つのYAMLファイルに複数のDockerコンテナ定義を行い、
複数コンテナの管理、連携を効率化するツール。k8sよりも手軽に使える分、k8sよりもできることはかなり少ない。ローカルでLTレベルの動作確認を行うのであればこれで十分だと思われる。

### 起動コマンド
```bash
docker-compose -f {YAML_FILE} up -d
```
### オプション
* -f {YAML_FILE} : 起動時のyamlファイルを指定。指定なしだとカレントの「docker-compose.yml」が設定される。
* -d : upのオプション。バックグラウンドで実行される。逆に-dを指定しなければ、ターミナル上にcompose構成コンテナのログを見ることができる。

### ログ取得(バックグランド起動時)
```bash
docker-compose -f {YAML_FILE} logs --tail=all -t
```
### オプション
* --tail : allだとすべて、整数値で、後ろからの表示行数を指定可能。
* -t : タイムスタンプをくっつけて表示する。

## docker

### イメージの作成

```bash
docker image build -f deployment/dockerfiles/web-server/Dockerfile -t centos:nginxtest . # 最後の「.」がカレントディレクトリで実行の意
```

#### オプション

* -f {DOCKER_FILE} : Dockerファイルの指定。
* -t タグの指定.「:」の左側がリポジトリ名称、右側がタグ名称となる。


### コンテナ作成

```bash
docker run --rm --name nginx_test -p 9090:9123 centos:nginxtest
```

#### オプション

* --rm : 終了時、自動的にコンテナを削除
* --name : コンテナの名称を指定
* -p : ポートフォワーディング。左側がDockerコンテナのポート、右側がホストPCのポート。

### その他のDockerコマンド

* docker ps : 現在稼働中のコンテナの一覧。「-a」をつけるとすべてのコンテナを表示。

```bash
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                            NAMES
bc967a8d3527        centos:nginxtest    "nginx -g 'daemon of…"   4 seconds ago       Up 2 seconds        80/tcp, 0.0.0.0:9090->9123/tcp   nginx_test

```

* docker images/ docker image ls : イメージ一覧。「-a」をつけると中間イメージも含めて表示
* docker container rm {CONTAINER_ID} : 指定したコンテナを削除
* docker image rm {IMAGE_ID} : 指定したイメージを削除。ただし、指定イメージで作成されたコンテナが存在している場合エラーとなる。この場合、コンテナを削除してからイメージを削除する必要あり。
* docker exec {CONTAINER_NAME} {COMMAND} : 稼働中のコンテナ内で{COMMAND}を実行。結果はコンソールに表示。
* docker attach {CONTAINER_NAME} : 稼働中のコンテナ内部に入る。Ctrl+Qでホストの戻ることができる。

## ホストOS上のコンテナ間通信

`link` or `network`での接続が可能。ただし`link`は公式ドキュメント上で`legacy feature`とされており、推奨されていない。よって`network`よりデフォルトで提供されるBridgeインターフェースを用いる。

* ネットワークの確認
```bash
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
518552b941b8        bridge              bridge              local <-使うのはこれ
be46431a0b28        host                host                local
50e2c508a603        none                null                local
```

* 独自Bridgeネットワークの作成
```bash
docker network create --driver bridge {NW_NAME}
docker network inspect {NW_NAME}  # 確認用コマンド
```

* コンテナをネットワークに所属させて起動
```bash
docker container run --network {NW_NAME} {IMAGE_NAME}
```
