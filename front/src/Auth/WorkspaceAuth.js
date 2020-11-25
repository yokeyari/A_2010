import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import UserInfoContext from '../context';
import Main from '../Main/Main';
import Transition from "../Transition";
import Loading from "../Loading";
import Workspace from '../Workspace/Workspace';
import { WorkspaceDataSource } from '../Main/ProductionApi';

const workspaceDataSource = new WorkspaceDataSource();

export default function PageAuth(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useParams();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);


  const mode = props.mode;
  const search_word = props.search_word;

  useEffect(() => {
    if (mode == "user") {
      // setUserInfo({ ...userInfo, id: user_id });
      setIsLoading(false);
    } else {
      workspaceDataSource.getWorkspaceByToken(token)
        .then(res => {
          console.log("search ws by token")
          if (res.statusText == "OK") {
            console.log("find ws",res)
            res.json()
              .then(workspace => {
                console.log("get workspace", workspace);
                setIsLoading(false);
                // setState({ ...state, to: `${userInfo.id}/ws/${workspace.id}`, isLoaded: true });
              })
          } else {
            // ここにワークスペースがなかった時の処理

          }
        });
    }
  }, []);



  if (isLoading) {
    return <Loading open={isLoading} />
  }
  if (mode == "user") {
    return (
      // modeは何もやってない
      <Workspace mode="user" search_word={search_word} />
    )
  } else if (mode == "token") {
    return (
      // modeはまだ何もやってない
      <Workspace mode="token" search_word={search_word} />
    )
  }
}

