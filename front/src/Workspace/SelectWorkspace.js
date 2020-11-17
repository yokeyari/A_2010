import { useContext, useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import { FormControl, MenuItem } from '@material-ui/core';

import UserInfoContext from '../context';
import { WorkspaceDataSource } from '../Main/ProductionApi';


function SelectWorkspace(props) {
  const [workspaces, setWorkspaces] = useState([])
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  function switchWorkspace(event) {
    // 本番用
    // const workspace_id = event.target.value;
    // workspace_id=="main_page" ? props.history.push(`/${userInfo.id}`) : props.history.push(`/${userInfo.id}/ws/${workspace_id}`)

    // テスト用
    const workspace_id = event.target.value;
    // workspace=="home" ? props.history.push(`/${userInfo.id}`) : props.history.push({pathname: `/${userInfo.id}/ws/${workspace.id}`, state: {workspace: workspace}})
    workspace_id=="home" ? props.history.push(`/${userInfo.id}`) : props.history.push(`/${userInfo.id}/ws/${workspace_id}`)
  }

  useEffect(() => {
    console.log('load workspace list');
    // 本番用
    // workspacesDataSource.getWorkspaceIndex().then(res => {
    //   console.log('load workspace list');
    //   setState({...state, workspaces: res.workspaces});
    // })

    // テスト用
    const test_workspaces = [{id: 1, name: "ws1", permission: "general"}]
    setWorkspaces(test_workspaces);
  }, [])

  return (
    <div className="Select-Workspace-List">
      <Grid item>
        <FormControl>
          <Select onChange={switchWorkspace}
            defaultValue="select workspace"
            className={""}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"home"}>user page</MenuItem>
            {
                workspaces.map((workspace) => (
                <MenuItem value={workspace.id} key={workspace.id}>{workspace.name} ({workspace.permission})</MenuItem>
                ))
            }
          </Select>
        </FormControl>
      </Grid>
    </div>
  )
}

export default withRouter(SelectWorkspace);