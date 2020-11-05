import React from "react";

class Memo extends React.Component {
  constructor(){
    super();
    this.state = {
      memos: [{}]
    }
      
    this.changeText = this.changeText.bind(this)
    this.submitMemo = this.submitMemo.bind(this)
    this.fetchMemos = this.fetchMemos.bind(this)
  }
  componentWillMount(){
    this.fetchMemos()
  }

  fetchMemos(){
    fetch("http://localhost:3001/memos") // データを取得しに行く
    .then( response => response.json() ) // json型のレスポンスをオブジェクトに変換する
    .then( json => { // オブジェクトに変換したレスポンスを受け取り、
      this.setState({ memos: json }) // Stateを更新する
    })
  }
    
  changeText(event) {
    const inputText = event.target.value
    this.setState({ inputText: inputText })
    console.dir(inputText);
  }

  submitMemo() {
    fetch("http://localhost:3001/memos", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: this.state.inputText })
    })
    .then( this.fetchMemos )
  }

  // editMemo(memoId) {
  //     fetch("http://localhost:3001/memos"+'/'+String(memo.id), {
  //       method: "EDIT",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({second: memo.second, memo: fixedMemo})
  //     })
  //     .then( this.fetchMemos )
  // }

  deleteMemo(memoId, fixedMemo) {
    fetch("http://localhost:3001/memos/"+memoId, {
      method: "DELETE"
    })
    .then( this.fetchMemos )
  }

  render(){
    return(
      <div>
        <div id="memo-form" className="Main-memo">
          <textarea type="text" id="memo-input" className="Main-memoArea" onChange={this.changeText}/>
          <button id="submit" onClick={this.submitMemo}>submit</button>
        </div>

        <div>
          {
            this.state.memos.map( memo => {
              return (
                <div className="Post-memos" key={ memo.id }>
                  { memo.body }
                  <button className="edit" onClick={ ()=>{}}>edit</button>
                  <button className="delete" onClick={ ()=>{ this.deleteMemo(memo.id) } }>delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
      )
  }
  
}

export default Memo;