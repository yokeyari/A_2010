import React, { useState, useEffect, useContext, memo } from 'react'
import { Container } from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom'
import { UserInfoContext } from '../context';
import { PageAuther, MemoAuther } from '../Auth/Authers'
// import { UserDataSource } from '../Main/ProductionApi';

export default function UserAuth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { user_id } = useParams();

  // const user = { ...userInfo, permission: "owner", workspace_id: "home" }
  const isLogin = (userInfo.isLogin == true) ? true : false;
  // const pageAuther = new PageAuther(user);
  // const memoAuther = new MemoAuther(user);

  const error_page =
    <Container>
      nothing found ,pleas check url
    </Container>

  // useEffect(() => {
  //   setUserInfo({ ...userInfo})
  // }, [user_id,userInfo.workspace_id]);

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