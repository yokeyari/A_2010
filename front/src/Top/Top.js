import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";


import Login from './Login';
import Promotion from './Promotion';
import "./Login.css";
import { UserDataSource } from '../Main/ProductionApi';
import Signup from "./Signup";

function Top() {
  // console.log(useRouteMatch());
  const path = useRouteMatch();

  const UserAPI = new UserDataSource();

  // UserAPI.loginUser(user)
  // UserAPI.createUser(user)
  // UserAPI.updateUser(user)
  // UserAPI.deleteUser(user)
  // UserAPI.getUser(user_id)

  return (
    <div>
      {path == "/login" ?
        <Login />
        :
        <Signup />
      }
      <Promotion />
    </div>
  );
}



export default Top;
