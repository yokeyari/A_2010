import React, { useState, useEffect } from 'react'
import MemoComponent from './MemoComponent'

function MemoList(props) {
  const player = props.player;
  if(props.memos.length===0){
    return "Loading";
  }
  return (
    <div>
      {
        props.memos.map(memo =>
          (<MemoComponent
            key={memo.id.toString()}
            memo={memo}
            onChange={props.onChange}
            onDelete={props.onDelete}
            player={player}
          />)
        )
      }
    </div>
  )
}

export default MemoList;