# MemoTube

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2020/09/JPHACKS2020_ogp.jpg)](https://www.youtube.com/watch?v=G5rULR53uMk)

## 製品概要
### オンライン授業 x Tech
### 背景(製品開発のきっかけ、課題等）
オンライン授業でパソコンを見ながらノートをとるのは大変だと思います．そもそもパソコンとノートを並べるには広いスペースが必要な上，授業の進行スピードによっては動画を止めたり戻したりする必要もあります.そこで動画を見ながら時間付きのノートをとることを同じ画面で行いたいと思いました．
* パソコンで動画を見ながらメモをとりたい人向け．
* メモをとった部分にパッと飛ぶことができます．
* メモを共有することで動画の面白い部分や大切な箇所を友達に教えられます．
* ログイン機能があるので過去のメモを保存して後で見返すことができます．

### 製品説明（具体的な製品の説明）
### Web アプリケーション
ブラウザから使えるので簡単に利用できます．<br/>
http://memotube.xyz:3000/

### 使用の説明 & 使い方
以下の画面がデスクトップ端末での遷移画面になります．<br/>
まず，ログイン画面に遷移します． ここでログインもしくはサインアップをすることでユーザ画面に遷移します．新規に動画メモを作成する際にはヘッダーの＋ボタンを押すと動画URLと動画タイトルの入力欄が開き，メモページに遷移しメモが始まります．<br/>
メモページはタイトル，メモページにつけるタグ一覧とタグの作成欄，URLの動画，メモ作成欄と作成したメモリストから成ります．それぞれ直感的に操作できるようにデザインされているため誰でもすぐに利用できるでしょう．作成したメモは記述したときの動画時間と共にメモリストに表示されます．メモリスト上で作成したメモの編集・削除が可能です．メモに付随した時間をクリックすることで, 動画のその時間にジャンプできるため，動画重要なところを後々振り返る際に便利です．キーワード検索欄から作成したメモの検索も可能です. タグは手動で作成するだけでなくメモ内容から自動的に作成することも出来ます. メモ内容をAIによって感情のハイライトをすることが出来ます.<br/>
ユーザ画面には作成したメモの一覧が動画ページごとに表示されます。

### 特長
 1.動画に対し時間と共にメモ付け．
 
 2. メモ記入時に動画が止まり, メモ保存時に動画が再開.

 3.メモを保存し後で見直せる．

 4.メモページのリンクを相手に伝えてメモを共有．

 5.ページタイトルやメモ内容, タグからメモページをシームレスな検索．
 
 6.AIによるメモページのタグを自動生成や, メモ内容から感情を読み取りメモのハイライト.

### 解決出来ること
オンデマンド授業を見ながらの勉強・要約・振り返り・他の人との問題共有が容易になる.


### 今後の展望
* 現在はネット上の動画しか再生できないため、ローカルに動画ファイルも再生できるようにする
<span style="color: red">TODO</span>

### 注力したこと（こだわり等）
* メモ作成機能.
* ログイン機能．
* メモページの共有機能．
* デプロイ
* 

<span style="color: red">TODO

</span>

## 開発技術
### 活用した技術
#### API・データ
* bert
* gooラボAPI

#### フレームワーク・ライブラリ・モジュール
* React

* Ruby on Rails
* docker
<!--
#### デバイス
* Web
*
-->
### 独自技術
#### ハッカソンで開発した独自機能・技術
* Reactを用いたアプリケーションのデザインやルーティングなど
* Ruby on Railsを用いたAPIの作成やデータベースの管理など
* gooラボAPIを用いた形態素解析による自動タグ生成
* bertを用いた <span style="color: red">TODO</span>

<!--
#### 製品に取り入れた研究内容（データ・ソフトウェアなど）（※アカデミック部門の場合のみ提出必須）
* 
* 
-->
