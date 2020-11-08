import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import UserInfoContext from './context';
import Main from './Main/Main';
import Transition from "./Transition";
import Loading from "./Loading";
import { PageDataSource } from './Main/ProductionApi';

const pageDataSource = new PageDataSource();

export default function PageAuth(props) {
  const [isLoading, segtIsLoading] = useState(true);
  const { token, user_id, page_id } = useParams();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);


  const mode = props.mode;
  // 将来的には閲覧のみのトークンも発行してここでモードを切り替える

  useEffect(() => {
    if (mode == "user") {
      setUserInfo({ ...userInfo, id: user_id });
      segtIsLoading(false);
    } else {
      pageDataSource.getPageByToken(token)
        .then(res => {
          console.log("not ok",res)
          if (res.statusText == "OK") {
            res.json()
              .then(page => {
                console.log("getPage", page.page);
                segtIsLoading(false);
                // setState({ ...state, to: `/${userInfo.id}/${page.page.id}`, isLoaded: true });
              })
          } else {
            // ここにページが作れなかったときの処理
          }
        });
    }
  }, []);



  if (isLoading) {
    return <Loading open={isLoading} />
  }
  if (mode == "user") {
    return (

      <Main mode="user" page_id={page_id} />
    )
  } else if (mode == "token") {
    return (
      <Main mode="token" page_id={page_id} />
    )
  }
}

