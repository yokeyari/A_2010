import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, ReferenceLine, Brush
} from 'recharts';
import React from 'react';



export default function GraphBarSentiment(props) {

  const data = props.data.map(memoSentiment => { return { xValue: memoSentiment.time, text: memoSentiment.text, positiveness: memoSentiment.positiveness, negativeness: memoSentiment.negativeness } });

  const handleClickBar = (event) => {
    console.log("click event", event);
  }


  const CustomTooltip = ({ active, payload, label }) => {
    const tooltip = {
      backgroundColor: 'white',
      opacity: '0.9',
      border: '1px solid black',
      borderRadius: '15px',			
      paddingLeft:'10px',
      paddingRight:'10px'
    }

    if (active) {
      return (
        <div className="custom-tooltip" style={tooltip}>
          <p className="label">{`${label} (s)`}</p>
          <p className="label">{`positiveness : ${payload[1].value.toFixed(1)}`}</p>
          <p className="label">{`negativeness : ${payload[0].value.toFixed(1)}`}</p>
          <p className="desc">{data.find(record => record.xValue==label).text}</p>
        </div>
      );
    }
    return null;
  };
  

  return (
    <div style={{ width: '90%', height: 500 }}>
      <h4>memo sentiment</h4>
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xValue" />
          <YAxis />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine y={0} stroke='#000' />
          <Brush dataKey='xValue' height={30} stroke="#8884d8" />
          <Bar dataKey="positiveness" fill="#8884d8" onClick={handleClickBar} />
          <Bar dataKey="negativeness" fill="#82ca9d" onClick={handleClickBar} />
        </BarChart>
      </ResponsiveContainer>
      <h4>time</h4>
    </div>
  )
}