import React, { useState, useEffect } from 'react'

import "./Main.css";
// import Memo from "./Memo/Memo";
import VideoPlayer from "./VideoPlayer";
import MemoList from './Memo/MemoList';
import WriteMemoForm from './Memo/WriteMemoForm';
import { timeContext } from './context/time-context'

import * as MemoAPI from './LocalApi';

function Main() {
  const [memos, setMemos] = useState([]);
  const [reloader, setReloader] = useState(0);
  const [player, setPlayer] = useState({
    time:0,
    player:null
  });
  // const timeContext = React.createContext(0)

  useEffect(() => {
    MemoAPI.fetchMemos().then(json => { setMemos(json) })
  }, [reloader])

  function withUpdate(fun) {
    fun.then(() => setReloader(reloader + 1));
  }

  function handleDelete(memo) {
    withUpdate(MemoAPI.deleteMemo(memo));
  }
  function handleChange(memo) {
    withUpdate(MemoAPI.editMemo(memo));
  }

  function handleSubmit(memo) {
    withUpdate(MemoAPI.submitNewMemo(memo));
  }

  return (
    <div className="Main">

      <main className="Main-main">
        {/* <timeContext.Provider value={{ time, setTime }}> */}
          <VideoPlayer className="" players={{player,setPlayer}}/>
          <WriteMemoForm onSubmit={handleSubmit} player={player}/>
          <MemoList
            memos={memos}
            onChange={handleChange}
            onDelete={handleDelete}
            player={player}
          />
        {/* </timeContext.Provider> */}
      </main>
    </div>
  );
}

export default Main;
