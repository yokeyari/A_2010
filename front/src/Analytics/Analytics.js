import Button from '@material-ui/core/Button';
import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { PageDataSource, WorkspaceDataSource } from '../Main/ProductionApi'

import SelectWorkspace from '../Workspace/SelectWorkspace';
import UserInfoContext from '../context'
import NewPage from '../NewPage/NewPage';
import {PageAuther} from '../Auth/Authers';

const pageDataSource = new PageDataSource();
const workspaceDataSource = new WorkspaceDataSource();


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    //marginTop: theme.spacing(2),
  },
}));

function Analytics(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const user = userInfo;
  const classes = useStyles();
  const page = props.page;

  const graphType = [0,1,2,3,4,5]


  return (
    <div>
      <Grid container className={classes.grid} direction="row">
        <Grid container direction="row" justify="center" alignItems="center">

          <Button component={Link} to={`/${userInfo.id}/${page.id}`}>Back</Button>
          <Box style={{ marginRight: "20px" }}>Types</Box>
          <ButtonGroup color="primary" >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={graphType}
              //onChange={}
              //defaultValue="0"
            >
            {graphType.map(type => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
            </Select>
          </ButtonGroup>
        </Grid>

        
        
        {/* <Graph/> */}

      </Grid>
    </div>
  );
}

export default Analytics;
