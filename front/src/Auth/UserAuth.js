import React, { useState, useEffect, useContext, memo } from 'react'
import { Container } from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom'
import UserInfoContext from '../context';
// import { UserDataSource } from '../Main/ProductionApi';

export default function UserAuth(props) {
  const { userInfo } = useContext(UserInfoContext);
  const { user_id } = useParams();
  // const [isMatch, setIsMatch ] = useState(true);

  // console.log("p user id", user_id)
  console.log("Auth userInfo", userInfo);

  const isLogin = (userInfo.isLogin == true) ? true : false;

  const error_page =
    <Container>
      nothing found ,pleas check url
  </Container>

  if (isLogin) {
    if (userInfo.id == user_id) {
      return props.children
    } else {
      return error_page
    }
  } else {
    return null
  }

}