# debianベースのpythonイメージをベースとする
FROM python:3.8-slim-buster

# 設定ファイルの転送(適当な場所が思いつかないので/app直下)
RUN mkdir -p /app/config
COPY requirements.txt /app/requirements.txt
COPY config/gunicorn_settings.py /app/config/gunicorn_settings.py
COPY flask_app.py /app/flask_app.py
COPY start.sh  /app/start.sh

# パッケージのインストール
RUN pip install -r /app/requirements.txt

#---追加---
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y unzip && \
    apt-get install -y git

RUN cd /usr/src/ && \
    wget https://github.com/BandaiNamcoResearchInc/sentiment-analysis-adapter/releases/download/0.2/sentiment-analysis-adapter.zip && \
    unzip sentiment-analysis-adapter.zip && \
    rm sentiment-analysis-adapter.zip && \
    git clone https://github.com/huggingface/transformers

# bert関係とflask関係をpipでインストール
RUN pip install torch torchvision
RUN pip install git+https://github.com/adapter-hub/adapter-transformers.git \
    pip install mecab-python3==0.996.5 \
    pip install unidic-lite \
    pip install fugashi \
    pip install ipadic \
    pip install flask \
    pip install flask-cors
#---

EXPOSE 9876
# cdにあたるコマンド
WORKDIR /app

# run実行時のコマンド
# ENTRYPOINT->CMDでCMDはrunのときの引数で上書きすることが可能
ENTRYPOINT [ "gunicorn", "flask_app:app" ]
# CMD ["python", "flask_app.py"]
# CMD [ "-c", "/app/config/gunicorn_settings.py" ]
RUN  chmod +x ./start.sh
# CMD ["./start.sh"]
RUN ./start.sh
CMD [ "-c", "/app/config/gunicorn_settings.py" ]
