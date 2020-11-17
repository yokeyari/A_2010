import { useContext, useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import { FormControl, MenuItem } from '@material-ui/core';

import UserInfoContext from '../context';
import { WorkspaceDataSource } from '../Main/ProductionApi';


function SelectWorkspaceList(props) {
  const [workspaces, setWorkspaces] = useState([])
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  function switchWorkspace(event) {
    // 本番用
    // const workspace_id = event.target.value;
    // props.history.push(`/ws/${userInfo.id}/${workspace_id}`);

    // テスト用
    props.history.push(`/${userInfo.id}`);
  }

  useEffect(() => {
    console.log('load workspace list');
    // 本番用
    // workspacesDataSource.getIndex().then(res => {
    //   console.log('load workspace list');
    //   setState({...state, workspaces: res.workspaces});
    // })

    // テスト用
    const test_workspaces = [{id: 1, name: "ws1", permission: "normal"}]
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
            <MenuItem value={userInfo.id}>user page</MenuItem>
            {
                workspaces.map((workspace) => (
                <MenuItem value={workspace.id}>{workspace.name} ({workspace.permission})</MenuItem>
                ))
            }
          </Select>
        </FormControl>
      </Grid>
    </div>
  )
}

export default withRouter(SelectWorkspaceList);