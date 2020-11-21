import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageDataSource, WorkspaceDataSource } from '../Main/ProductionApi'
import PageList from '../User/PageList';
import SelectWorkspace from '../Workspace/SelectWorkspace';
import EditWorkspaceButton from '../Workspace/EditWorkspaceButton';
import UserInfoContext from '../context'

const pageDataSource = new PageDataSource();
const workspaceDataSource = new WorkspaceDataSource();

function Workspace(props) {
  const { workspace_id } = useParams();
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [workspace, setWorkspace] = useState({ name: "" }) // ないと最初のrenderでworkspace.nameがエラー
  const [userPermissionList, setUserPermissionList] = useState([]);
  const user = userInfo;

  console.log(userInfo.workspace_id);

  // ユーザーの権限が必要なところで呼び出す
  const checkUserPermission = () => {
    // 権限を持っていたら何もしない
    // 権限がなかったらエラー分を出すなどする
  }

  const loadPages = () => {
    if (props.search_word == "") {
      workspaceDataSource.getPageIndex(workspace_id).then(res => {
        res.json().then(pages => {
          console.log("ws pages", pages)
          setState({ ...state, pages: pages })
        })
      })

    } else {
      pageDataSource.searchPage(user, props.search_word.split(' '), userInfo.workspace_id)
        .then(pages => {
          console.log("load page", pages);
          setState({ ...state, pages: pages });
        })
    }
  }

  useEffect(() => {
    workspaceDataSource.getWorkspace(workspace_id).then(res => {
      res.json().then(workspace => {
        console.log("get workspace and permission", workspace);
        // 後でログインユーザーのワークスペースの権限だけもらうAPIを用意する
        const permission = workspace.users.filter(user_p => user_p.user.id == userInfo.id ? true : false)[0].permission;
        setUserInfo({ ...userInfo, workspace_id: workspace_id, permission: permission });
        setWorkspace(workspace);
        loadPages();
      })
    })
    workspaceDataSource.getWorkspaceUsers(userInfo.workspace_id).then(res => {
      res.json().then(user_p_list => {
        console.log("get workspace user and permission", user_p_list);
        setUserPermissionList(user_p_list)
        // const id_p_list = user_p_list.map((user_p) => { return { user_id: user_p.user.id, permission: user_p.permission } })
        // setInitFields({ ...initFields, users: id_p_list });
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
      <h2>{workspace.name} ({userInfo.permission})</h2>
      {/* <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word}ã€€onClick={() => {handleSeach(state.search_word)}} /> */}

      {/* <SelectWorkspace /> */}
      {userInfo.workspace_id !== "home" ? <EditWorkspaceButton workspace={workspace} user_p_list={userPermissionList} /> : <></>}
      <PageList pages={state.pages} withUpdate={withUpdate} />
    </div>
  );
}


export default Workspace