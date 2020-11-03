import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

function WriteMemoForm(props) {
  const [text, setText] = useState("");
  const player = props.player;

  const handleOnclick = () => {
    props.onSubmit({body:text,time:player.time});
    setText("");
  }



  return (
    <div>
      <div id="memo-form" className="Main-memo">
        <textarea type="text" id="memo-input" className="Main-memoArea" onChange={e=>setText(e.target.value)} value={text}/>
        <button id="submit" onClick={handleOnclick}>submit</button>
        {/* for test */}
        {/* <button onClick={() => {console.log(player);player.player.player.seekTo(0.3)}}>Skip to 20s</button> */}
      </div>
    </div>
  )
}

export default WriteMemoForm;