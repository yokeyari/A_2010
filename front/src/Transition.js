import React, { useState, useEffect, useContext } from 'react';
import { usePromiseTracker } from "react-promise-tracker";

export const Transition = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
      {
        (promiseInProgress === true) ?
          <h3>Hey I'm a spinner loader wannabe !!!</h3>
          :
          props.component
      }
      {props.children}
    </div>
  )
};