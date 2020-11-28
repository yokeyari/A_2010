import Button from '@material-ui/core/Button';
import React, { useContext, useEffect, useState } from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as PageAPI from '../Main/LocalApi';
import { PageDataSource, WorkspaceDataSource } from './../Main/ProductionApi'
import User from './User';
//import './User.css';
import PageList from './PageList';
import PageLink from './PageLink';
import SearchForm from './SeachForm';
import SelectWorkspace from '../Workspace/SelectWorkspace';
import { UserInfoContext } from '../context'
import NewPage from '../NewPage/NewPage';
import { PageAuther } from '../Auth/Authers';
import Home from '../Home/Home'


function UserHome(props) {
  const { userInfo } = useContext(UserInfoContext);
  const pageDataSource = new PageDataSource({ id: userInfo.id });
  const userMessage =
    <h2 className="User-name">Welcome {userInfo.name}!</h2>
  return (
    <Home top={userMessage} dataSource={pageDataSource} {...props} />
  )
}

export default UserHome