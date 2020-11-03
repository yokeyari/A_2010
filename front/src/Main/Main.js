import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import "./Main.css";
import { makeStyles } from '@material-ui/core/styles';
// import Memo from "./Memo/Memo";
import VideoPlayer from "./VideoPlayer";
import MemoList from './Memo/MemoList';
import WriteMemoForm from './Memo/WriteMemoForm';
import { timeContext } from './context/time-context'
import NewPage from '../NewPage/NewPage';

import * as MemoAPI from './LocalApi';
const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    maxHeight: '50vh',
    //overflow:'auto'
  }
}));


function Main() {
  const classes = useStyles();
  const [memos, setMemos] = useState([]);
  const [reloader, setReloader] = useState(0);
  const [player, setPlayer] = useState({
    time: 0,
    player: null
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
    <div className="Main"　>

      <main className="Main-main" style={{ backgroundColor: "#e7ecec", }}>
        {/* <timeContext.Provider value={{ time, setTime }}> */}
        <Grid container className={classes.grid}　>
          <Grid item className={classes.grid}>
            <VideoPlayer className="" players={{ player, setPlayer }} />
          </Grid>
          <Grid item className={classes.grid}>
            <NewPage/>
            <MemoList
              memos={memos}
              onChange={handleChange}
              onDelete={handleDelete}
              player={player}
            />
          </Grid>
          <Grid item>
            <WriteMemoForm onSubmit={handleSubmit} player={player} />
          </Grid>
        </Grid>
        {/* </timeContext.Provider> */}
      </main>
    </div>
  );
}

export default Main;
