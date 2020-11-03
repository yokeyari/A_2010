import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';

import * as PageAPI from '../Main/LocalApi';
import User from './User';
//import './User.css';
import PageList from './PageList';
import SearchForm from './SeachForm';

import NewPage from '../NewPage/NewPage';

function Home(props) {
  const [state, setState] = useState({ search_word: "", pages: [] });

  const loadPages = () => {
    PageAPI.fetchMemos().then(json => {setState({ ...state, pages: json }) })
  }

  useEffect(() => {
    loadPages();
  }, []);

  const withUpdate = (doSomething) => {
    doSomething.then(() => { loadPages() })
  }

  const handleChangeSeachForm = (text) => {
    setState({ ...state, search_word: text })
  }

  const handleSeach = ()=>{
    // サーチしてwithUpdateする．

  }

  return (
    <div className="User-Top">
      <h2 className="User-name">Welcome {"user"}!</h2>
      <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word}　onClick={handleSeach} />
      <NewPage/>
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