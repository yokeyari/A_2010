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
import { PageDataSource } from './../Main/ProductionApi'
import User from './User';
//import './User.css';
import PageList from './PageList';
import SearchForm from './SeachForm';
import UserInfoContext from '../context'

import NewPage from '../NewPage/NewPage';

const pageDataSource = new PageDataSource();

function Home(props) {
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const { user_id } = useParams();
  const user = {...userInfo,id: user_id };
  // 今は認証しない
  // todo 認証

  // console.log("userinco",userInfo);
  console.log("search",props.search_word)

  const loadPages = () => {
    if(props.search_word==""){
      pageDataSource.getPageIndex(user).then(res=>{
        if(res===undefined){
          
        }else{
          setState({...state , pages:res.pages})
        }
      })
    }else{
      pageDataSource.searchPage(user, props.search_word.split(' '))
      .then(res=>{
        // console.log(props.search_word)
        console.log(res.pages);
        setState({...state , pages:res.pages});
      })
    }
    // PageAPI.fetchMemos().then(json => { setState({ ...state, pages: json }) })

  }

  useEffect(() => {
    setUserInfo({...userInfo,...user});
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