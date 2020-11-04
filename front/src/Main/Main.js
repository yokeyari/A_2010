import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import "./Main.css";
import { makeStyles } from '@material-ui/core/styles';
// import Memo from "./Memo/Memo";
import VideoPlayer from "./VideoPlayer";
import MemoList from './Memo/MemoList';
import WriteMemoForm from './Memo/WriteMemoForm';
import NewPage from '../NewPage/NewPage';
import Title from './Memo/Titile'

import * as MemoAPI from './LocalApi';
const useStyles = makeStyles((theme) => ({
  root: {
      padding:'2vh 1vw',
      width:'100%',
      height:'70%',
      //backgroundColor:"#ffffff",
      backgroundColor: "#e7ecec", 
  }
}));


function Main(props) {
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

  function handleChangeTitle(title) {
    // post server
  }


  return (
    <div className="Main">

      <main className={classes.root}>
        {/* <timeContext.Provider value={{ time, setTime }}> */}
        <Grid item>
          {/* todo いい感じの場所とデザインに．
        あとタイトルを更新できるように */}
          {/*<NewPage />*/}
          <Title title={props.title} />
        </Grid>

        <Grid container className ={classes.grid} direction="row">
        <Grid item xs={10} md={6}>
        <Grid container className={classes.grid}　direction="column">
          <Grid item>
            <VideoPlayer className="" url={props.url} players={{ player, setPlayer }} />
          </Grid>
          <Grid item>
          <WriteMemoForm onSubmit={handleSubmit} player={player} />
          </Grid>
        </Grid>
        </Grid>
        <Grid item xs={10} md={6}>
            <MemoList
              memos={memos}
              onChange={handleChange}
              onDelete={handleDelete}
              player={player}
            />
          </Grid>
        </Grid>
        {/* </timeContext.Provider> */}
      </main>
    </div>
  );
}

export default Main;
