import Graph2D from "./Graph2D";
import GraphSentimentScatter from "./GraphSentimentScatter"
import { Button, FormControl, InputLabel, MenuItem, Grid, Select } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';

import VideoPlayer from "../VideoPlayer";
import Title from '../Memo/Titile'
import TagList from '../Tag/TagList';
import TagForm from '../Tag/TagForm';
import { makeStyles } from '@material-ui/core/styles';
import { BertDataSource, PageDataSource } from "../ProductionApi";
import { dummy_browseDays, dummy_browseTimes, dummy_memos } from "./demoData"


const useStyles = makeStyles((theme) => ({
  root: {
    //padding: '2vh 1vw',
    width: '100%',
    height: '70%',
    //backgroundColor:"#ffffff",
    backgroundColor: "#e7ecec",
  },
  form: {
    padding: '15px',
  }
}));


const BertApi = new BertDataSource();
const PageApi = new PageDataSource();

export default function Analytics(props) {

  const [player, setPlayer] = useState({
    time: 0,
    player: null,
    playing: false,
    duration: null
  });
  const [dataList, setDataList] = useState(
    {
      browse_times: null,
      browse_dates: null
    }
  )
  const [data, setData] = useState({ X: { "": [] }, Y_list: { "  ( )": [] } });
  const [memoSentiment, setMemoSentiment] = useState([{ time: 0, positiveness: 0, negativeness: 0 }])
  const [userIds, setUserIds] = useState([]);
  const [graphName, setGraphName] = useState("browse_dates");
  const [visState, setVisState] = useState("play");
  const [visUser, setVisUser] = useState("sum");
  const [reloader, setReloader] = useState(0);
  const classes = useStyles();

  // テーブルのカラム名とグラフでの表示名
  const states = {total_play: "play", total_write_memo: "memo", total_else: "pause"}
  const memos = props.memos;
  const page = props.page;


  function withUpdate(fun) {
    fun.then(() => setReloader(reloader + 1));
  }

  function createData(table, xlabel) {
    const user_ids = [...new Set(table.map(record => record.user_id))];
    let X = [...new Set(table.map(record => record[xlabel]))];
    X.sort((a, b) => a - b);
    const Y_all = Object.fromEntries(
      Array.prototype.concat.apply([],
        Object.keys(states).map(state => {
          const state_count_each_id = user_ids.map(user_id => {
            const count_each_id = X.map(x => {
              const value = table.find(record => (record.user_id == user_id && record[xlabel] == x))
              return value ? value[state] : 0
            })
            return [states[state] + ` (${user_id})`, count_each_id]
          })
          const state_count_all_id = []
          for (let i = 0; i < state_count_each_id[0][1].length; i++) {
            let count = 0
            for (let j = 0; j < user_ids.length; j++) count += state_count_each_id[j][1][i]
            state_count_all_id.push(count)
          }

          return state_count_each_id.concat([[states[state] + " (sum)", state_count_all_id]])
        })
      )
    )
    X = { [xlabel]: X };
    return [user_ids, { X: X, Y_list: Y_all }]
  }


  useEffect(() => {
    let browseTimes = [];
    let browseDays = [];
    PageApi.getBrowseState(page.id).then(res => {
      res.json().then(json => {
        // console.log(json)
        browseTimes = json.browse_times;
        browseDays = json.browse_days
        // browseDays = dummy_browseDays;

        if (browseTimes.length && browseDays.length) {
          // console.log(browseTimes, browseDays)
          const [user_ids, data_time] = createData(browseTimes, "time");
          const [_, data_day] = createData(browseDays, "day");

          setDataList({ ...dataList, browse_times: data_time, browse_dates: data_day });
          setUserIds(user_ids);
          setData(dataList["browse_times"]);
        }
      })
    })

    // console.log(memos)
    if (memos.length) {
      const text_list = memos.map(memo => memo.text)
      BertApi.getSentment(text_list).then(res => {
        setMemoSentiment(res.map((score, i) => {
          return { memo_id: memos[i].id, user_id: memos[i].user_id, time: memos[i].time, text: memos[i].text, positiveness: score.positiveness, negativeness: score.negativeness }
        }))
      })
    } else {
      setMemoSentiment([{ memo_id: null, user_id: null, text: null, time: null, positiveness: null, negativeness: null }])
    }
  }, [])

  const handleChangeGraph = (event) => {
    const graph_name = event.target.value;
    // console.log(graph_name);
    setData(dataList[graph_name]);
    setGraphName(graph_name);
  }

  const handleChangeState = (event) => {
    const state = event.target.value;
    setVisState(state);
  }

  const handleChangeUser = (event) => {
    const vis_user = event.target.value
    setVisUser(vis_user);
  }

  const body =
    graphName == "memoSentiment"
      ? <GraphSentimentScatter data={memoSentiment} vis_user={visUser} onClick={props.onClick} player={player} xmin={0} xmax={player.duration} />
      : data ? <Graph2D X={data.X} Y_list={data.Y_list} vis_state={visState} vis_user={visUser} onClick={props.onClick} player={player} xmin={0} xmax={player.duration} /> : null

  return (
    <main className={classes.root}>
      {/* <timeContext.Provider value={{ time, setTime }}> */}
      <Grid item>
        <Title title={page.title} />
      </Grid>

      <Card>
        <Grid container direction="row" justify="center" alignItems="center">
          <Button color="primary" onClick={() => { props.onClick() }}>Back</Button>
          <Grid item>
            <FormControl className={classes.form}>
              <InputLabel id="demo-simple-select-label">graph type</InputLabel>
              <Select onChange={handleChangeGraph}
                defaultValue={"none"}
                className={""}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"none"} key={0} >none</MenuItem>
                <MenuItem value={"browse_times"} key={1} >再生時間 / 視聴状況</MenuItem>
                <MenuItem value={"browse_dates"} key={2} >日 / 視聴状況</MenuItem>
                <MenuItem value={"memoSentiment"} key={4} >再生時間 / メモ内容</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {graphName != "memoSentiment" ?
              <FormControl className={classes.form}>
                <InputLabel id="demo-simple-select-label">state</InputLabel>
                <Select onChange={handleChangeState}
                  defaultValue={"play"}
                  className={""}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"any"} key={0} >すべて表示</MenuItem>
                  <MenuItem value={"play"} key={1} >再生回数 (play)</MenuItem>
                  <MenuItem value={"memo"} key={2} >メモ記入中 (memo)</MenuItem>
                  <MenuItem value={"pause"} key={3} >ポーズ中 (pause)</MenuItem>
                </Select>
              </FormControl>
              : null
            }
          </Grid>
          <Grid item>
            <FormControl className={classes.form}>
              <InputLabel id="demo-simple-select-label">user_id</InputLabel>
              <Select onChange={handleChangeUser}
                defaultValue={"sum"}
                className={"sum"}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"any"} key={0} >すべて表示</MenuItem>
                {
                  userIds.map(user_id => <MenuItem value={user_id} key={user_id} >{user_id}</MenuItem>)
                }
                {graphName != "memoSentiment" ? <MenuItem value={"sum"} key={-1} >全員</MenuItem> : null}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Grid container className={classes.grid} direction="row">
        <Grid item xs={10} md={6}>
          <Grid container className={classes.grid} direction="row">
            <Grid item xs={12}>
              <VideoPlayer className="" url={page.url} players={{ player, setPlayer }} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={10} md={6}>
          <Grid item xs={12}>

            <Card>
              {body}
            </Card>

          </Grid>
        </Grid>
      </Grid>

    </main>
  )
}
