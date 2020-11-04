import React, { useState, useEffect, useContext } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter as Router, Route, Link, Redirect, useHistory, withRouter } from 'react-router-dom';

const Transition = (props) => {
  const [isLoaded,setIsLoaded] = useState(false);


  const { promiseInProgress } = usePromiseTracker();
  // const component=()

  useEffect(()=>{
    if (!promiseInProgress & props.ok) {
      // useHistory().push(props.to);
      props.history.push(props.to);
      return null
    }
  },[props.ok])


  return (
    
    <div>
      {
        (promiseInProgress === true) ?
          <h1>Now Loading !!</h1>
          :
          null
      }
      {props.children}
    </div>
  )
};

{/* props.ok ? <Redirect to={props.to} /> : null */}

export default withRouter(Transition);