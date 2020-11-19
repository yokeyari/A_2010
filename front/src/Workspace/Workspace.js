import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageDataSource, WorkspaceDataSource } from '../Main/ProductionApi'
import PageList from '../User/PageList';
import SelectWorkspace from '../Workspace/SelectWorkspace';
import UserInfoContext from '../context'

const pageDataSource = new PageDataSource();
const workspaceDataSource = new WorkspaceDataSource();

function Workspace(props) {
  const { ws_id } = useParams();
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [wsInfo, setWsInfo] = useState({name: ""}) 
  const user = userInfo;

  console.log(userInfo.ws_id);

  // ユーザーの権限が必要なところで呼び出す
  const checkUserPermission = () => {
    // 権限を持っていたら何もしない
    // 権限がなかったらエラー分を出すなどする
  }

  const loadPages = () => {
    if(props.search_word==""){
      // // 本番用
      // // ワークスペース用に変更
      // // pageDataSource.getPageIndex(user).then(res=>{
      // workspaceDataSource.getPageIndex(ws_id).then( res => {
      //   if(res===undefined){
          
      //   }else{
      //     setState({...state , pages:res.pages})
      //   }
      // })

      // テスト用
      const test_pages = [{id: 4, url:"demo", title: "demo", tags: [], memos: []}];
      setState({...state , pages: test_pages});
    }else{
      // ワークスペース用に変更
      // pageDataSource.searchPage(user, props.search_word.split(' '))
      workspaceDataSource.searchPage(ws_id, props.search_word.split(' '))
      .then(res=>{
        // console.log(props.search_word)
        console.log("load page");
        setState({...state , pages:res.pages});
      })
    }
    // PageAPI.fetchMemos().then(json => { setState({ ...state, pages: json }) })

  }

  useEffect(() => {
    workspaceDataSource.getWorkspace(ws_id).then(res => {
      res.json().then(json => {
        const ws = json.workspace;
        setUserInfo({...userInfo, ws_id: ws_id, permission: ws.permission});
        setWsInfo({...wsInfo, name: ws.name});
      })
    })
  }, [userInfo.ws_id])

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
    // 本番用
    <div className="User-Top">
      <h2>{wsInfo.name} ({userInfo.permission})</h2>
      {/* <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word}ã€€onClick={() => {handleSeach(state.search_word)}} /> */}

      <SelectWorkspace />
      <PageList pages={state.pages} withUpdate={withUpdate} />
    </div>
  );
}


export default Workspace