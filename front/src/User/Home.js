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


import * as PageAPI from '../Main/LocalApi';
import { PageDataSource, WorkspaceDataSource } from './../Main/ProductionApi'
import User from './User';
//import './User.css';
import PageList from './PageList';
import SearchForm from './SeachForm';
import SelectWorkspace from '../Workspace/SelectWorkspace';
import UserInfoContext from '../context'
import NewPage from '../NewPage/NewPage';

const pageDataSource = new PageDataSource();
const workspaceDataSource = new WorkspaceDataSource();

function Home(props) {
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const user = userInfo;

  // const { user_id } = useParams();
  // const user = {...userInfo,id: user_id };

  // console.log("userinco",userInfo);
  // console.log("search",props.search_word)

  const loadPages = () => {
    if(props.search_word==""){
      // ws_id?"home"???????
      pageDataSource.getPageIndex(user).then(res=>{
      // workspaceDataSource.getPageIndex("home").then(res=>{
        if(res===undefined){
          
        }else{
          setState({...state , pages:res.pages})
          console.log("----------");
          console.log(res.pages);
        }
      })
    }else{
      // ws_id?"home"???????
      pageDataSource.searchPage(user, props.search_word.split(' '))
      // workspaceDataSource.searchPage("home", props.search_word.split(' '))
      .then(res=>{
        // console.log(props.search_word)
        console.log("load page");
        setState({...state , pages:res.pages});
      })
    }
    // PageAPI.fetchMemos().then(json => { setState({ ...state, pages: json }) })

  }

  useEffect(() => {
    setUserInfo({...userInfo, ws_id: "home", permission: "owner"});
  }, [])

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
      {/*className="User-To"*/}
      <h2 className="User-name">Welcome {userInfo.name}!</h2>
      {/* <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word}　onClick={() => {handleSeach(state.search_word)}} /> */}

      <SelectWorkspace />
      <PageList pages={state.pages} withUpdate={withUpdate} />
    </div>

  );
}


export default Home
{/*  const newPageButton =
    <Button id="New">
      <a href='/home'>New</a>
      {/* newpage 用,TODO:routing 
      </Button>;
    */}
{/*<div className="search-bar" >*/ }
{/*<h2 className="User-name">Welcome {"user"}!</h2>
        {newPageButton}*/}
{/*</div>*/ }