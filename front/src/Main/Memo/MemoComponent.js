import React, { useState, useEffect } from "react";

import {formatSec2Str} from '../Duration';

// class Memo{
//   body = '';
//   time = 0;
//   id = 0;
// }

function MemoComponent(props){
  const [isEditMode, setEditMode] = useState(false);
  const [text,setText] = useState(props.memo.body)
  const memo = props.memo
  const player = props.player
  
  const endEditMode = ()=>{
    props.onChange({...memo,body:text});
    setEditMode(false);
  }

  const handleJump = ()=>{
    player.player.player.seekTo(memo.time)
  }


  const body = 
    isEditMode ?
      <textarea type="text" id="memo-input" className="" onChange={(e) => setText(e.target.value)} value={text}></textarea>
    :
      memo.body;
  return (
    <div className="Post-memos" key={memo.id}>
      <button className="timeButton" onClick={()=>{handleJump()}} >{formatSec2Str(memo.time)}</button>
      {body}
      {isEditMode ? 
        <button className="edit" onClick={() => {endEditMode()} }>done</button> :
        <button className="edit" onClick={() => { setEditMode(true) }}>edit</button>}
      <button className="delete" onClick={() => { props.onDelete(memo) }}>delete</button>
    </div>
  )
}

export default MemoComponent;