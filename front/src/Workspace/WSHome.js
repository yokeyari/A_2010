import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { WSPageDataSource, WorkspaceDataSource } from '../Main/ProductionApi'
import PageList from '../User/PageList';
import SelectWorkspace from './SelectWorkspace';
import EditWorkspaceButton from './EditWorkspaceButton';
import { UserInfoContext } from '../context'
import Home from '../Home/Home'

const workspaceDataSource = new WorkspaceDataSource();



function WSHome(props) {
  const { userInfo } = useContext(UserInfoContext);
  const [workspace, setWorkspace] = useState({ name: "" })
  const [userPermissionList, setUserPermissionList] = useState([]);
  const user = userInfo;
  const workspace_id = userInfo.workspace_id;
  const pageDataSource = new WSPageDataSource(workspace_id);
  // const pageAuther = userInfo.pageAuther


  useEffect(() => {
    workspaceDataSource.getWorkspace(workspace_id).then(res => {
      res.json().then(workspace => {
        setWorkspace(workspace);
      })
    })
  }, [workspace_id])

  const top = (
    <div>
      <h2>{workspace.name} ({userInfo.permission})</h2>
      <EditWorkspaceButton workspace={workspace} user_p_list={userPermissionList} />
    </div>
  )


  return (
    <Home top={top} dataSource={pageDataSource} {...props} />
  )
}


export default WSHome