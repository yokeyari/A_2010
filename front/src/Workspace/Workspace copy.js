import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageDataSource, WorkspaceDataSource } from '../Main/ProductionApi'
import PageList from '../User/PageList';
import SelectWorkspace from './SelectWorkspace';
import EditWorkspaceButton from './EditWorkspaceButton';
import { UserInfoContext } from '../context'

const pageDataSource = new PageDataSource();
const workspaceDataSource = new WorkspaceDataSource();

function Workspace(props) {
  // const { workspace_id } = useParams();
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [workspace, setWorkspace] = useState({ name: "" }) // ないと最初のrenderでworkspace.nameがエラー
  const [userPermissionList, setUserPermissionList] = useState([]);
  const user = userInfo;
  const workspace_id = userInfo.workspace_id;
  const pageAuther = userInfo.pageAuther


  const pages = state.pages.map(page => {
    page.auth = pageAuther.makeAuth(page);
    return page
  }).filter(p => p.auth.canRead);

  console.log(userInfo)

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
        setWorkspace(workspace);
        loadPages();
      })
    })
  }, [workspace_id])

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
      <PageList pages={pages} withUpdate={withUpdate} />
    </div>
  );
}


export default Workspace