import React from 'react';
import './User.css';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      memos: [{}]
    };
  }

  componentWillMount() {
    this.fetchMemos()
  }

  fetchMemos() {
    fetch("http://localhost:3001/memos") // データを取得しに行く
      .then(response => response.json()) // json型のレスポンスをオブジェクトに変換する
      .then(json => { // オブジェクトに変換したレスポンスを受け取り、
        this.setState({ memos: json }) // Stateを更新する
      })
  }

  changeText(event) {
    const inputText = event.target.value
    this.setState({ inputText: inputText })
  }

  submitMemo() {
    fetch("http://localhost:3001/memos", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memo: this.state.inputText })
    })
      .then(this.fetchMemos)
  }

  render() {

    return (
      <div className="User-Top">
        <div className="User-bar">
          <h2 className="User-name">Welcome {"user"}!</h2>
          <button id="New">
            <a href='/home'>New</a>
          </button>
          <textarea type="text" value="search" />
        </div>

        <div className="User-memos">
          {this.state.memos.map(memo => (
            <div className="User-memo" key={memo.id}>
              {memo.body}
              <p>ID: {memo.id}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default User