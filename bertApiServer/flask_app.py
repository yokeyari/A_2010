from flask import Flask, jsonify, abort, make_response, request
from flask_cors import CORS

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AdapterType

# model, tokenizerのインスタンスを生成, モデルにadapterをロード
model = AutoModelForSequenceClassification.from_pretrained("cl-tohoku/bert-base-japanese-whole-word-masking")
tokenizer = AutoTokenizer.from_pretrained("cl-tohoku/bert-base-japanese-whole-word-masking")
adapter_path = '/usr/src/sst-2/'
model.load_adapter(adapter_path)

# 入力の文章(string)に対して, 一次元目がネガティブさ, 二次元目がポジティブさを表す二次元ベクトルを返す
def predict(sentence):
    token_ids = tokenizer.convert_tokens_to_ids(tokenizer.tokenize(sentence))
    input_tensor = torch.tensor([token_ids])
    outputs = model(input_tensor, adapter_names=['sst-2'])
    # result = torch.argmax(outputs[0]).item()
    # return ('positive' if result == 1 else 'negative', outputs[0])
    return outputs[0]


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Index Page!'


@app.route('/health')
def health():
    return 'Health Check OK!!'

# @app.route('/sentiment', method=['GET'])
@app.route('/sentiment')
def sentiment():
    sentiment_value = predict(request.args.get('text'))
    return jsonify({
        'body': {
            'positiveness': sentiment_value[0][1].item(), 
            'negativeness': sentiment_value[0][0].item()
        }
    })