import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import React, { useEffect, useState } from 'react';

export default function Graph2D(props) {

  const labels = props.labels;
  const categories = props.categories;
  const colors = props.colors;
  const X = props.X;
  const Y_list = props.Y_list;
  const data = X.map((v, i) => { return Object.assign({ name: v, r: 8 }, Object.fromEntries(categories.map((category, j) => [category, Y_list[j][i]]))) });

  const handleClickLine = (event) => {
    console.log("click event", event);
  }

  return (
    <div style={{ width: '90%', height: 500 }}>
      <h4>{labels[1]}</h4>
      <ResponsiveContainer>
        <LineChart width={600} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {categories.map((category, i) => {
            return (
              <Line type="monotone" dataKey={category} stroke={colors[i]} activeDot={{ onClick: handleClickLine, r: 8 }} />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
      <h4>{labels[0]}</h4>
    </div>
  )
}
