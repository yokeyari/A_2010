import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageDataSource, WorkspaceDataSource } from '../Main/ProductionApi'
import PageList from '../User/PageList';
import SelectWorkspace from '../Workspace/SelectWorkspace';
import UserInfoContext from '../context'

const pageDataSource = new PageDataSource();
const workspaceDataSource = new WorkspaceDataSource();

function Workspace(props) {
  const { workspace_id } = useParams();
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [wsInfo, setWsInfo] = useState({name: ""}) 
  const user = userInfo;

  console.log(userInfo.workspace_id);

  // ユーザーの権限が必要なところで呼び出す
  const checkUserPermission = () => {
    // 権限を持っていたら何もしない
    // 権限がなかったらエラー分を出すなどする
  }

  const loadPages = () => {
    if(props.search_word==""){
      // 本番用 要API確認
      workspaceDataSource.getPageIndex(workspace_id).then( res => {
        res.json().then(json => {
          const pages = json.pages;
          // setState({...state , pages: pages})
          console.log("ws pages", pages)
        })
      })

      // テスト用
      const test_pages = [{id: 28, url:"demo", title: "demo", tags: [], memos: []}];
      setState({...state , pages: test_pages});
    }else{
      // 本番用 要API確認
      // workspaceDataSource.searchPage(workspace_id, props.search_word.split(' '))
      pageDataSource.searchPage(user, props.search_word.split(' '), userInfo.workspace_id)
      .then(res=>{
        // console.log(props.search_word)
        console.log("load page");
        setState({...state , pages:res.pages});
      })
    }
    // PageAPI.fetchMemos().then(json => { setState({ ...state, pages: json }) })

  }

  useEffect(() => {
    // 要API確認
    workspaceDataSource.getWorkspace(workspace_id).then(res => {
      res.json().then(json => {
        const ws = json.workspace;
        setUserInfo({...userInfo, workspace_id: workspace_id, permission: ws.permission});
        setWsInfo({...wsInfo, name: ws.name});
        console.log("get workspace and permission")
      })
    })
  }, [userInfo.workspace_id])

  useEffect(() => {
    // setUserInfo({...userInfo,...user});
    loadPages();
  }, [props.search_word]);

  const withUpdate = (doSomething) => {
    doSomething.then(() => { loadPages() })
  }

  const handleChangeSeachForm = (text) => {
    setState({ ...state, search_word: text })
  }

  const handleSeach = () => {
    loadPages();
  }


  return (
    <div className="User-Top">
      <h2>{wsInfo.name} ({userInfo.permission})</h2>
      {/* <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word}ã€€onClick={() => {handleSeach(state.search_word)}} /> */}

      <SelectWorkspace />
      <PageList pages={state.pages} withUpdate={withUpdate} />
    </div>
  );
}


export default Workspace