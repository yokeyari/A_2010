import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Scatter, ScatterChart, ReferenceLine, Brush
} from 'recharts';
import React from 'react';



export default function GraphBarSentiment(props) {

  const vis_user = props.vis_user;
  const data = props.data.map(memoSentiment => { 
    return (vis_user=="any" || vis_user==memoSentiment.user_id)
      ? { xValue: memoSentiment.time, text: memoSentiment.text, positiveness: (memoSentiment.positiveness - memoSentiment.negativeness) } 
      : {xValue: null, text: null, positiveness: null}
    });
  const player = props.player;

  const CustomTooltip = ({ active, payload, label }) => {
    const tooltip = {
      backgroundColor: 'white',
      opacity: '0.9',
      border: '1px solid black',
      borderRadius: '15px',			
      paddingLeft:'10px',
      paddingRight:'10px'
    }

    if (active && payload && typeof(payload[0])!="undefined") {
      const time = payload[0].value;
      const positiveness = payload[1].value.toFixed(1)
      return (
        <div className="custom-tooltip" style={tooltip}>
          <p className="label">{`${time} (s)`}</p>
          <p className="label">{`positiveness : ${positiveness}`}</p>
          <p className="desc">{data.find(record => record.xValue==time).text}</p>
        </div>
      );
    }
    return null;
  };

  const handleJump = (event) => {
    //console.log(player.player.player);
    //console.log(event);
    player.player.player.seekTo(event.payload.xValue);
  }

  const changeDotColor = (entry) => {
    // console.log(positiveness);
    const positiveness = entry.positiveness
    return (positiveness>=0) ? "#82ca9d" : "#8884d8";
  }


  return (
    <div style={{ width: '100%', height: 400 }}>
      <h4>memo sentiment</h4>
      <ResponsiveContainer>
        <ScatterChart width={600} height={300}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"xValue"} type="number" domain={[props.xmin, props.xmax]} />
          <YAxis dataKey={"positiveness"} type="number" />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine y={0} stroke='#000' />
          <Scatter name="positiveness" data={data} fill="#82ca9d" onClick={handleJump} >
          {
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={changeDotColor(entry)} />)
					}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <h4>time</h4>
    </div>
  )
}