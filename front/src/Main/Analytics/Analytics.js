import Graph2D from "./Graph2D";
import GraphBarSentiment from "./GraphBarSentiment"
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
  const [graphName, setGraphName] = useState("");
  const [visState, setVisState] = useState("any");
  const [visUser, setVisUser] = useState("any");
  const classes = useStyles();

  const states = ["total_play", "total_write_memo", "total_else"]
  const memos = props.memos;
  const page = props.page;


  function createData(table, xlabel) {
    const user_ids = [...new Set(table.map(record => record.user_id))];
    let X = [...new Set(table.map(record => record[xlabel]))];
    X.sort((a, b) => a - b);
    const Y_all = Object.fromEntries(
      Array.prototype.concat.apply([],
        states.map(state => {
          const state_count_each_id = user_ids.map(user_id => {
            const count_each_id = X.map(x => {
              const value = table.find(record => (record.user_id == user_id && record[xlabel] == x))
              return value ? value[state] : 0
            })
            return [state + ` (${user_id})`, count_each_id]
          })
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
    // ダミーデータ
    // const browseTimes = dummy_browseTimes;
    // const browseDays = dummy_browseDays;
    // const memos = dummy_memos;

    let browseTimes = [];
    let browseDays = [];
    PageApi.getBrowseState(page.id).then(res => {
      res.json().then(json => {
        console.log(json)
        browseTimes = json.browse_times
        browseDays = json.browse_days

        if (browseTimes.length && browseDays.length) {
          console.log(browseTimes, browseDays)
          const [user_ids, data_time] = createData(browseTimes, "time");
          const [_, data_day] = createData(browseDays, "day");

          setDataList({ ...dataList, browse_times: data_time, browse_dates: data_day });
          setUserIds(user_ids);
          setData(dataList["browse_times"]);
        }
      })
    })

    console.log(memos)
    if (memos.length) {
      const text_list = memos.map(memo => memo.text)
      BertApi.getSentment(text_list).then(res => {
        setMemoSentiment(res.map((score, i) => {
          return { user_id: memos[i].user_id, time: memos[i].time, text: memos[i].text, positiveness: score.positiveness, negativeness: score.negativeness }
        }))
      })
    } else {
      setMemoSentiment([{user_id:null, text:null, time:null, positiveness:null, negativeness:null}])
    }

  }, [])

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
      ? <GraphBarSentiment data={memoSentiment} vis_user={visUser} onClick={props.onClick} player={player} xmin={0} xmax={player.duration} />
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
                {graphName != "memoSentiment" ? <MenuItem value={"sum"} key={-1} >sum</MenuItem> : null}
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
