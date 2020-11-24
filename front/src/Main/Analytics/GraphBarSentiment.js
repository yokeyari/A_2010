import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, ReferenceLine, Brush
} from 'recharts';
import React from 'react';



export default function GraphBarSentiment(props) {

  const vis_user = props.vis_user;
  const data = props.data.map(memoSentiment => { 
    return (vis_user=="any" || vis_user==memoSentiment.user_id)
      ? { xValue: memoSentiment.time, text: memoSentiment.text, positiveness: memoSentiment.positiveness, negativeness: memoSentiment.negativeness } 
      : {xValue: null, text: null, positiveness: null, negativeness: null}
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
      return (
        <div className="custom-tooltip" style={tooltip}>
          <p className="label">{`${label} (s)`}</p>
          <p className="label">{`positiveness : ${payload[0].value.toFixed(1)}`}</p>
          <p className="label">{`negativeness : ${payload[1].value.toFixed(1)}`}</p>
          <p className="desc">{data.find(record => record.xValue==label).text}</p>
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


  return (
    <div style={{ width: '100%', height: 400 }}>
      <h4>memo sentiment</h4>
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xValue" type="number" domain={[props.xmin, props.xmax]} />
          <YAxis />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine y={0} stroke='#000' />
          <Brush dataKey='xValue' height={30} stroke="#8884d8" />
          <Bar dataKey="positiveness" fill="#82ca9d" onClick={handleJump} />
          <Bar dataKey="negativeness" fill="#8884d8" onClick={handleJump} />
        </BarChart>
      </ResponsiveContainer>
      <h4>time</h4>
    </div>
  )
}