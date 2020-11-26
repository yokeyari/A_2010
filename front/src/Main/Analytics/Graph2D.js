import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import React, { useEffect, useState } from 'react';
import colors from './colors';

export default function Graph2D(props) {

  const vis_state = props.vis_state;
  const vis_user = props.vis_user;
  const player = props.player;
  const X = props.X;
  console.log(X);
  const Y_list = Object.entries( props.Y_list ).filter(Y => {
    const state = Y[0].split(" ")[0]
    const user_id = Y[0].split("(")[1].split(")")[0]
    return ((vis_state=="any" || state==vis_state) && (vis_user=="any" || user_id==vis_user))
  });
  const data = Object.values(X)[0].map( (v, i) => 
    Object.assign( 
      { xValue: v, r: 8 }, 
      Object.fromEntries( Y_list.map( Y =>  [Y[0], Y[1][i]] )) 
    )
  );


  const handleJump = (event) => {
    //console.log(player.player.player);
    //console.log(event);
    player.player.player.seekTo(event.payload.xValue);
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h4>Appearance / {Object.keys(X)[0]}</h4>
      <ResponsiveContainer>
        <LineChart width={600} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <XAxis dataKey="xValue" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {Y_list.map((Y, i) => {
            return (
              <Line type="monotone" key={Y[0]} dataKey={Y[0]} stroke={colors[i]} activeDot={ {onClick: handleJump , r: 8 }} />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
      <h4>{Object.keys(X)[0]}</h4>
    </div>
  )
}
