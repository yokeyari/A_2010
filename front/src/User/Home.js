import Button from '@material-ui/core/Button';
import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


import * as PageAPI from '../Main/LocalApi';
import {PageDataSource} from './../Main/ProductionApi'
import User from './User';
//import './User.css';
import PageList from './PageList';
import SearchForm from './SeachForm';
import UserInfoContext from '../context'

import NewPage from '../NewPage/NewPage';


function Home() {
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const {user_id} = useParams();
  const user = {id:user_id}
  // 今は認証しない
  // todo 認証

  const loadPages = () => {
    PageAPI.fetchMemos().then(json => { setState({ ...state, pages: json }) })
    PageDataSource.getPageIndex(user)
  }

  useEffect(() => {
    setUserInfo(user)
    loadPages();
  }, []);

  const withUpdate = (doSomething) => {
    doSomething.then(() => { loadPages() })
  }

  const handleChangeSeachForm = (text) => {
    setState({ ...state, search_word: text })
  }

  const handleSeach = () => {
    // サーチしてwithUpdateする．

  }

  return (
    <div className="User-Top">
      <h2 className="User-name">Welcome {userInfo.id}!</h2>
      <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word} onClick={handleSeach} />
      {/* <NewPage /> */}
      <PageList pages={state.pages} />
    </div>

  );
}

// 気の迷いでクラスで書いてみたけど，やっぱ関数にした

// class Home extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       search_word: "",
//       pages: []
//     };
//   }

//   loadPages() {
//     PageAPI.fetchMemos().then(json => { this.setState({ ...this.state,pages: json }) })
//   }

//   componentDidMount() {
//     this.loadPages()
//   }

//   withUpdate(doSomething) {
//     doSomething.then(() => { this.loadPages() })
//   }

//   handleChangeSeachForm = (text) => {
//     this.setState({ ...this.state, search_word: text })
//   }

//   // changeText(event) {
//   //   const inputText = event.target.value
//   //   this.setState({ inputText: inputText })
//   // }

//   // submitMemo() {
//   //   fetch("http://localhost:3001/memos", {
//   //     method: "POST",
//   //     headers: {
//   //       'Accept': 'application/json',
//   //       'Content-Type': 'application/json'
//   //     },
//   //     body: JSON.stringify({ memo: this.state.inputText })
//   //   })
//   //     .then(this.fetchMemos)
//   // }


//   render() {
//     const newPageButton =
//       <Button id="New">
//         <a href='/home'>New</a>
//         {/* newpage 用,TODO:routing */}
//       </Button>;


//     return (
//       <div className="User-Top">
//         <div className="search-bar">
//           <h2 className="User-name">Welcome {"user"}!</h2>
//           {newPageButton}
//           <SearchForm onChange={this.handleChangeSeachForm} search_word={this.search_word} />
//         </div>

//         <PageList pages={this.state.pages} />
//       </div>
//     );
//   }
// }

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