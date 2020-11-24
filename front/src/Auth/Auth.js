import { Container } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import {UserInfoContext} from '../context';
import { UserDataSource } from '../Main/ProductionApi';

const userDataSource = new UserDataSource();

function Auth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { user_id,page_id } = useParams();
  const [isMatch, setIsMatch ] = useState(true);

  console.log("p user id", user_id)
  console.log("Auth userInfo", userInfo);

  const isLogin = (userInfo.isLogin == true) ? true : false;

  const error_page = 
  <Container>
    nothing found ,pleas check url
  </Container>

  if(isLogin){
    if(userInfo.id == user_id){
      return props.children
    }else{
      return error_page
    }
  }else{
    return null
  }



  // return (token ? props.children : <Redirect to={'/login'} />)
}

export default Auth