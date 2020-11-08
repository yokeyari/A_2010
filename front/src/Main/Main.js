import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Select from "@material-ui/core/Select";
import { Button, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import "./Main.css";
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
import { MemoDataSource, PageDataSource, TagDataSource, BertDataSource } from './ProductionApi';

import UserInfoContext from '../context'

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
const PageApi = new PageDataSource();
const BertApi = new BertDataSource();

function Main(props) {
  const classes = useStyles();
  const [memos, setMemos] = useState([]);
  const [reloader, setReloader] = useState(0);
  const [player, setPlayer] = useState({
    time: 0,
    player: null,
    playing: false
  });
  const [page, setPage] = useState({ page: { title: "", url: "" }, tags: [] });
  const [isLoading, segtIsLoading] = useState(false);
  const [colorList, setColorList] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  console.log(useParams());

  const page_id = props.page_id;


  
  //const page_id = page.page_id;

  useEffect(() => {
    MemoAPI.getMemoIndex(page_id).then(json => {
      setMemos(json)
      //これがないとメモ以外が即座に更新されない
      PageApi.getPage(page_id).then(json => {
        json.json().then(json => {
          segtIsLoading(false);
          setPage({ ...json });
        }
        )
      })
    })
  }, [reloader,page_id])

  useEffect(() => {
    // ここでタイトルなどの読み込み
    segtIsLoading(true);
    PageApi.getPage(page_id).then(json => {
      json.json().then(json => {
        segtIsLoading(false);
        setPage({ ...json });
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
    console.log({tags:page.tags,page:{...page.page,title:title}});
    // setPage({tags:page.tags,page:{...page.page,title:title}});
    // withUpdate(PageApi.updatePage({ url: page.page.url, title: title, id: page_id }));
  }

  function handleWriting() {
    if (true) {
      setPlayer({ ...player, playing: false })
    }
  }

  function changeMemoColor(event) {
    const mode = event.target.value;
    const tmp_memos = memos.memos;
    let text_list = [];
    for (let i = 0; i < tmp_memos.length; i++) {
      console.log(tmp_memos[i].text);
      text_list.push(tmp_memos[i].text);
    }
    const np_scores = BertApi.getSentment(text_list).then(res => {
      console.log(res);
      let tmp_colorList = [];
      if (mode === "positive") {
        tmp_colorList = res.map((np) => {
          if (np.positiveness > 1.0) {
            return "#FFB300";
            // return "#FFE4C4"
          } else if (np.positiveness > 0.5) {
            // return "#E6EE9C";
            return "#FFD54F"
          }
        })
      } else if (mode === "negative") {
        tmp_colorList = res.map((np) => {
          if (np.negativeness > 1.0) {
            return "#33C7FF";
          } else if (np.negativeness > 0.5) {
            return "#33F2FF";
          }
        })
      }
      setColorList(tmp_colorList)
    }

    );
  }

  function handleWriteEnd() {
    if (true) {
      setPlayer({ ...player, playing: true })
    }
  }

  return (
    <div className="Main">
      <Loading open={isLoading}>
      </Loading>
      <main className={classes.root}>
        {/* <timeContext.Provider value={{ time, setTime }}> */}
        <Grid item>
          <Title title={page.page.title} onChange={handleChangeTitle} />
        </Grid>

        <Grid container className={classes.grid} direction="row">
          <Grid item xs={10} md={6}>
            <Grid container className={classes.grid} direction="column">

              <Grid item xs={10} md={12}>
                <TagList tags={page.tags} withUpdate={withUpdate} />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} direction="row">
              <Grid item xs={12} md={12}>
                <TagForm page_id={page.page.id} withUpdate={withUpdate} />
              </Grid>

              <Grid item xs={12}>
                <VideoPlayer className="" url={page.page.url} players={{ player, setPlayer }} />
              </Grid>
              <Grid item xs={12}>
                <WriteMemoForm onSubmit={handleSubmit} player={player} onWriting={handleWriting} onWriteEnd={handleWriteEnd} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} md={6}>

            <Grid container direction="column" >


              <Grid container direction="row" justify="center" alignItems="center">

                <Grid item >
                  <Box style={{ marginRight: "20px" }}>AIによるハイライト</Box>
                </Grid>

                <Grid item>
                  <FormControl className={classes.formControl}>
                    <Select onChange={changeMemoColor}
                      defaultValue="None"
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}>
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value="positive">ポジティブ</MenuItem>
                      <MenuItem value="negative">ネガティブ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>

              <Grid item>
                <MemoList
                  memos={memos}
                  colorList={colorList}
                  onChange={handleChange}
                  onDelete={handleDelete}
                  player={player}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </timeContext.Provider> */}
      </main>
    </div>
  );
}

export default Main;
