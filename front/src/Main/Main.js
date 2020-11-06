import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";


import "./Main.css";
import { makeStyles } from '@material-ui/core/styles';
// import Memo from "./Memo/Memo";
import VideoPlayer from "./VideoPlayer";
import MemoList from './Memo/MemoList';
import WriteMemoForm from './Memo/WriteMemoForm';
import NewPage from '../NewPage/NewPage';
import Title from './Memo/Titile'
import Loading from '../Loading';
import TagList from './Tag/TagList';
import TagForm from './Tag/TagForm';

//import * as MemoAPI from './LocalApi';
import { MemoDataSource, PageDataSource, TagDataSource } from './ProductionApi';

const useStyles = makeStyles((theme) => ({
  root: {
    //padding: '2vh 1vw',
    width: '100%',
    height: '70%',
    //backgroundColor:"#ffffff",
    backgroundColor: "#e7ecec",
  }
}));

const MemoAPI = new MemoDataSource();
const pageDataSource = new PageDataSource();


function Main(props) {
  const classes = useStyles();
  const [memos, setMemos] = useState([]);
  const [reloader, setReloader] = useState(0);
  const [player, setPlayer] = useState({
    time: 0,
    player: null
  });
  const [page, setPage] = useState({ page: { title: "", url: "" }, tags: [] });
  const { user_id, page_id } = useParams();
  const [isLoading, segtIsLoading] = useState(false);
  // console.log(useParams())


  //const page_id = page.page_id;

  useEffect(() => {
    MemoAPI.getMemoIndex(page_id).then(json => { 
      setMemos(json) 
      //これがないとメモ以外が即座に更新されない
      pageDataSource.getPage(page_id).then(json => {
        json.json().then(json => {
          segtIsLoading(false);
          setPage({ ...json });
        }
        )
      })
    })
  }, [reloader])

  useEffect(() => {
    // ここでタイトルなどの読み込み
    segtIsLoading(true);
    pageDataSource.getPage(page_id).then(json => {
      json.json().then(json => {
        segtIsLoading(false);
        setPage({ ...json });
        console.log(page)
      }
      )
    })
  }, [])

  function withUpdate(fun) {
    fun.then(() => setReloader(reloader + 1));
  }

  function handleDelete(memo) {
    withUpdate(MemoAPI.deleteMemo(memo));
  }
  function handleChange(memo) {
    withUpdate(MemoAPI.updateMemo(memo));
  }

  function handleSubmit(memo) {
    withUpdate(MemoAPI.createMemo(memo, page_id));
  }

  function handleChangeTitle(title) {
    // post server
  }


  return (
    <div className="Main">
      <Loading open={isLoading}>
      </Loading>
      <main className={classes.root}>
        {/* <timeContext.Provider value={{ time, setTime }}> */}
        <Grid item>
          <Title title={page.page.title} />
        </Grid>
        {/*
        <Grid container className={classes.grid} direction="row">
          <Grid item xs={10} md={8}>
            <TagList tags={page.tags} withUpdate={withUpdate} />
          </Grid>
          </Grid>
          <Grid container className={classes.grid} direction="row">
          <Grid item xs={10} md={6}>
            <TagForm page_id={page.page.id} withUpdate={withUpdate} />
          </Grid>
        </Grid>*/}

        <Grid container className={classes.grid} direction="row">
          <Grid item xs={10} md={6}>
            <Grid container className={classes.grid} direction="column">
              
            <Grid item xs={10} md={12}>
            <TagList tags={page.tags} withUpdate={withUpdate} />
          </Grid>
          </Grid>
          <Grid container className={classes.grid} direction="row">
          <Grid item xs={10} md={12}>
            <TagForm page_id={page.page.id} withUpdate={withUpdate} />
          </Grid>

              <Grid item xs={12}>
                <VideoPlayer className="" url={page.page.url} players={{ player, setPlayer }} />
              </Grid>
              <Grid item xs={12}>
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
