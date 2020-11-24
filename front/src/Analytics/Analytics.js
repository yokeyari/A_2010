import Graph2D from "./Graph2D";
import GraphBarSentiment from "./GraphBarSentiment"
import { Button, FormControl, InputLabel, MenuItem, Grid, Select } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';

import VideoPlayer from "../Main/VideoPlayer";
import Title from '../Main/Memo/Titile'
import TagList from '../Main/Tag/TagList';
import TagForm from '../Main/Tag/TagForm';
import { makeStyles } from '@material-ui/core/styles';
import { BertDataSource } from "../Main/ProductionApi";


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

export default function Analytics(props) {

  const page=props.page;
  const classes = useStyles();
  const [player, setPlayer] = useState({
    time: 0,
    player: null,
    playing: false
  });

  const states = ["total_play", "total_write_memo", "total_else"]
  // テスト用
  const demoX = { "float number": Array(100).fill(0).map((_, i) => (i + 1) / 10) };
  const demoY = { "sin": Object.values(demoX)[0].map(v => Math.sin(v)), "cos": Object.values(demoX)[0].map(v => Math.cos(v)) }
  const demoData = { X: demoX, Y_list: demoY }
  const demoSentiment = [{ time: 0, positiveness: 0.5, negativeness: -0.5 }, { time: 3, positiveness: 1.2, negativeness: -0.7 }, { time: 5, positiveness: -0.5, negativeness: 1.2 }]

  const [dataList, setDataList] = useState(
    {
      // demo: demoData,
      browse_times: null,
      browse_dates: null
    }
  )
  const [data, setData] = useState({ X: { "": [] }, Y_list: { "  ( )": [] } });
  const [memoSentiment, setMemoSentiment] = useState([{ time: 0, positiveness: 0, negativeness: 0 }])
  const [userIds, setUserIds] = useState([]);
  const [graphName, setGraphName] = useState("");
  const [visState, setVisState] = useState("any");
  const [visUser, setVisUser] = useState("any");
  // const [body, setBody] = useState(null);

  function createData(table, xlabel) {
    const user_ids = [...new Set(table.map(record => record.user_id))];
    let X = [...new Set(table.map(record => record[xlabel]))].sort();
    const Y_all = Object.fromEntries(
      Array.prototype.concat.apply([],
        states.map(state => {
          const state_count_each_id = user_ids.map(user_id => {
            const count_each_id = X.map(x => {
              const value = table.find(record => (record.user_id == user_id && record[xlabel] == x))
              return value ? value[state] : 0
            })
            return [state + ` (${user_id})`, count_each_id]
          }
          )
          const state_count_all_id = []
          for (let i = 0; i < state_count_each_id[0][1].length; i++) {
            let count = 0
            for (let j = 0; j < user_ids.length; j++) count += state_count_each_id[j][1][i]
            state_count_all_id.push(count)
          }

          return state_count_each_id.concat([[state + " (sum)", state_count_all_id]])
        })
      )
    )
    X = { [xlabel]: X };
    return [user_ids, { X: X, Y_list: Y_all }]
  }


  useEffect(() => {
    // get analytics
    const browseTimes = [
      { user_id: 1, time: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
      { user_id: 1, time: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
      { user_id: 1, time: 3, total_play: 3, total_write_memo: 3, total_else: 0 },
      { user_id: 1, time: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
      { user_id: 1, time: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
      { user_id: 2, time: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
      { user_id: 2, time: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
      // {user_id: 2, time: 3, total_play: 3, total_write_memo: 3, total_else: 0},
      { user_id: 2, time: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
      { user_id: 2, time: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
    ]
    const browseDays = [
      { user_id: 1, day: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
      { user_id: 1, day: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
      { user_id: 1, day: 3, total_play: 3, total_write_memo: 3, total_else: 0 },
      { user_id: 1, day: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
      { user_id: 1, day: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
      { user_id: 2, day: 1, total_play: 5, total_write_memo: 3, total_else: 0 },
      { user_id: 2, day: 2, total_play: 4, total_write_memo: 3, total_else: 0 },
      { user_id: 2, day: 3, total_play: 3, total_write_memo: 3, total_else: 0 },
      { user_id: 2, day: 4, total_play: 2, total_write_memo: 3, total_else: 0 },
      { user_id: 2, day: 5, total_play: 1, total_write_memo: 3, total_else: 0 },
    ]
    const memos = [
      { user_id: 1, text: "今日はいい天気", time: 0 },
      { user_id: 1, text: "今日はいい天気", time: 1 },
      { user_id: 1, text: "今日は悪い天気", time: 2.5 },
      { user_id: 1, text: "今日は悪い天気", time: 3 },
      { user_id: 2, text: "今日はいい天気", time: 2 },
      { user_id: 2, text: "今日はいい天気", time: 1.8 },
      { user_id: 2, text: "今日は悪い天気", time: 2.2 },
      { user_id: 2, text: "今日は悪い天気", time: 3.5 },
    ]

    const [user_ids, data_time] = createData(browseTimes, "time");
    const [_, data_day] = createData(browseDays, "day");

    const text_list = memos.map(memo => memo.text)
    BertApi.getSentment(text_list).then(res => {
      setMemoSentiment(res.map((score, i) => {
        return { time: memos[i].time, text: memos[i].text, positiveness: score.positiveness, negativeness: score.negativeness }
      }))
    })

    setDataList({ ...dataList, browse_times: data_time, browse_dates: data_day });
    setUserIds(user_ids);
    setData(dataList["browse_times"]);
    // console.log(data)
    // console.log(dataList)
    // console.log(data_time)
  }, [])

  // useEffect(() => {
  //   data ? setBody( <Graph2D X={data.X} Y_list={data.Y_list} vis_state={visState} /> ) : setBody(null)
  // }, [data, visState])

  const handleChangeGraph = (event) => {
    const graph_name = event.target.value;
    console.log(graph_name);
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
      ? <GraphBarSentiment data={memoSentiment} onClick={props.onClick} player={player} />
      : data ? <Graph2D X={data.X} Y_list={data.Y_list} vis_state={visState} vis_user={visUser} onClick={props.onClick} player={player}/> : null

  return (
    <main className={classes.root}>
          {/* <timeContext.Provider value={{ time, setTime }}> */}
          <Grid item>
            <Title title={page.title}/>
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
                    <MenuItem value={"browse_times"} key={1} >browse time</MenuItem>
                    <MenuItem value={"browse_dates"} key={2} >browse date</MenuItem>
                    <MenuItem value={"memoSentiment"} key={4} >memo sentiment bar plot</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                {graphName != "memoSentiment" ?
                  <FormControl className={classes.form}>
                    <InputLabel id="demo-simple-select-label">state</InputLabel>
                    <Select onChange={handleChangeState}
                      defaultValue={"any"}
                      className={""}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"any"} key={0} >すべて表示</MenuItem>
                      <MenuItem value={"total_play"} key={1} >total play</MenuItem>
                      <MenuItem value={"total_write_memo"} key={2} >total write memo</MenuItem>
                      <MenuItem value={"total_else"} key={3} >total else</MenuItem>
                    </Select>
                  </FormControl>
                  : null
                }
              </Grid>
              <Grid item>
                {graphName != "memoSentiment" ?
                  <FormControl className={classes.form}>
                    <InputLabel id="demo-simple-select-label">user_id</InputLabel>
                    <Select onChange={handleChangeUser}
                      defaultValue={"any"}
                      className={""}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"any"} key={0} >すべて表示</MenuItem>
                      {
                        userIds.map(user_id => <MenuItem value={user_id} key={user_id} >{user_id}</MenuItem>)
                      }
                      <MenuItem value={"sum"} key={-1} >sum</MenuItem>
                    </Select>
                  </FormControl>
                  : null
                }
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

                {/* 元々のAnalytics */}
                
                <Card>
                  {/* {data ? <Graph2D X={data.X} Y_list={data.Y_list} vis_state={visState} vis_user={visUser} /> : null} */}
                  {/* <GraphBarSentiment data={memoSentiment} /> */}
                  {body}
                </Card>


              </Grid>
            </Grid>
          </Grid>

        </main>
  )
}
