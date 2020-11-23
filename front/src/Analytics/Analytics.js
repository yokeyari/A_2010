import Graph2D from "./Graph2D";
import { Button, FormControl, InputLabel, MenuItem, Grid, Select } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

export default function Analytics(props) {

  // テスト用
  const demoX = Array(100).fill(0).map((_, i) => (i + 1) / 10);
  const demoY = [demoX.map(v => Math.sin(v)), demoX.map(v => Math.cos(v))]

  const [data, setData] = useState(null)
  
  const data_list = {
    demo: {
      labels: ["float number", "output"], 
      categories: ["sin", "cos"], 
      colors: ["#8884d8", "#82ca9d"], 
      X: demoX, 
      Y_list: demoY
    }
  }

  useEffect(() => {
    setData(data_list["demo"]);
    console.log(data);
  }, [])

  const handleChangeGraph = (event) => {
    const graph_name = event.target.value;
    setData(data_list[graph_name]);
  }

  return (
    <div>
      <h1>グラフテスト</h1>
      <Grid item>
        <FormControl>
          <InputLabel id="demo-simple-select-label">graph type</InputLabel>
          <Select onChange={handleChangeGraph}
            defaultValue={"demo"}
            className={""}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"demo"} >demo graph</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {data ? <Graph2D X={data.X} Y_list={data.Y_list} labels={data.labels} categories={data.categories} colors={data.colors} /> : null}
    </div>
  )
}
