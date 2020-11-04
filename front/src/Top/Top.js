import React from "react";

import Login from './Login';
import Promotion from './Promotion';
import "./Login.css";
import {UserDataSource} from '../Main/ProductionApi';

function Top() {
  
  const UserAPI = new UserDataSource();
  
  // UserAPI.loginUser(user)
  // UserAPI.createUser(user)
  // UserAPI.updateUser(user)
  // UserAPI.deleteUser(user)
  // UserAPI.getUser(user_id)


  return (
    <div>
      <Login/>
      <Promotion/>
    </div>
  );
}



export default Top;
