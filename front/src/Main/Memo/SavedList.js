import React from 'react';

class SavedList extends React.Component {
  constructor() {
    super();
    this.dbURL = "http://localhost:3001/memos";
    this.state = {
      memos: [{id: 1, second: 0, memo: "video first point"}],
      doFix: {},
      fixedText: {}
    };
  }

  componentWillMount(){
    this.fetchMemos();
  }
  componentDidUpdate(){
    this.fetchMemos();
  }

  fetchMemos(){
    fetch(this.dbURL+"?_sort=second")
    .then( response => response.json() )
    .then( json => { 
      this.setState({ memos: json })
    })
  }

  handleDelete(id) {
    fetch(this.dbURL+"/"+String(id), {
      method: "DELETE",
    });
  }
  handleUpdateMemo(memo, fixedMemo) {
    console.log(memo.id, fixedMemo);
    fetch(this.dbURL+'/'+String(memo.id), {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({second: memo.second, memo: fixedMemo})
    });
  }

  render() {
    return (
      <div>
        {
          this.state.memos.map( memo => {
            return (
              <div className="memo" key={ memo.id }>
                <p>Saved Second: {memo.second}</p>
                <p>Saved Memo: {memo.memo}</p>
                <button onClick={()=>{document.getElementById('video').currentTime=memo.second}}>Skip to {memo.second}s</button>
                <button onClick={()=>{this.handleDelete(memo.id)}}>Delete</button>
                <button onClick={()=>{
                  var doFixC = {...this.state.doFix};
                  var fixedTextC = {...this.state.fixedText};
                  if (!doFixC[memo.id]) {
                    doFixC[memo.id] = true;
                    fixedTextC[memo.id] = memo.memo;
                  } else {
                    doFixC[memo.id] = false;
                  }
                  this.setState({doFix: doFixC, fixedText: fixedTextC});
                  console.log(this.state.doFix);
                }}>fix memo</button>
                {(()=>{
                  if (this.state.doFix[memo.id]===true){ return(
                    <p>
                      <textarea 
                        onChange={(event)=>{
                          var fixedTextC = this.state.fixedText;
                          fixedTextC[memo.id] = event.target.value;
                          this.setState({fixedText: fixedTextC})
                        }}
                        value={this.state.fixedText[memo.id]}
                      />
                      <button onClick={()=>{this.handleUpdateMemo(memo,this.state.fixedText[memo.id])}}>update</button>
                    </p>
                  )}
                })()}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default SavedList;