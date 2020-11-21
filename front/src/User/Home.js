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
import * as PageAPI from '../Main/LocalApi';
import { PageDataSource, WorkspaceDataSource } from './../Main/ProductionApi'
import User from './User';
//import './User.css';
import PageList from './PageList';
import PageLink from './PageLink';
import SearchForm from './SeachForm';
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

function Home(props) {
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const user = userInfo;
  const [isTagMode, setTagMode] = useState(false);
  const classes = useStyles();
  const [searchTag, setSearchTag] = useState('all');

  const pageAuther = new PageAuther(user);

  const tags = Array.from((pages => {
    let tags = new Set();
    (pages).forEach(page => {
      (page.tags).forEach(tag => tags.add(tag.text))
    })
    return tags
  })(state.pages));

  const pages = state.pages.map(page=>{
    page.auth = pageAuther.makeAuth(page);
    return page
  }).filter(p=>p.auth.canRead);



  const loadPages = () => {

    if (props.search_word == "") {
      // ws_id?"home"???????
      pageDataSource.getPageIndex(user).then(pages => {
        // workspaceDataSource.getPageIndex("home").then(res=>{
        if (pages === undefined) {

        } else {
          setState({ ...state, pages: pages })
        }
      })

    } else {
      // ws_id?"home"???????
      pageDataSource.searchPage(user, props.search_word.split(' '), userInfo.workspace_id)
        // workspaceDataSource.searchPage("home", props.search_word.split(' '))
        .then(pages => {
          // console.log(props.search_word)
          console.log("load page");
          setState({ ...state, pages: pages });
        })
    }
    // PageAPI.fetchMemos().then(json => { setState({ ...state, pages: json }) })
  }


  useEffect(() => {
    setUserInfo({ ...userInfo, workspace_id: "home", permission: "owner" });
  }, [])

  useEffect(() => {
    // setUserInfo({...userInfo,...user});
    loadPages();
  }, [props.search_word]);

  const withUpdate = (doSomething) => {
    doSomething.then(() => { loadPages() })
  }

  const handleTagChange = (event) => {
    setSearchTag(event.target.value);
  };

  // const handleChangeSeachForm = (text) => {
  //   setState({ ...state, search_word: text })
  // }

  // const handleSeach = () => {
  //   loadPages();
  // }

  if (isTagMode) {
    var tag_variant = "contained"
    var normal_variant = ""
  } else {
    var tag_variant = "";
    var normal_variant = "contained";
  }
  if (searchTag === "all") {
    var filtered_tag = tags;
  } else {
    var filtered_tag = [searchTag]
  }
  const pageListsWithTag = filtered_tag.map(tag => {
    let filteredpages = [];
    pages.forEach(page => (
      page.tags.forEach(e => (
        tag == e.text && filteredpages.push(page)
      ))
    ))
    return (
      <>
        <h1>{tag}</h1>
        <PageList pages={filteredpages} withUpdate={withUpdate} />
      </>
    )
  })


  return (
    <div className="User-Top">
      {/*className="User-To"*/}
      <h2 className="User-name">Welcome {userInfo.name}!</h2>
      {/* <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word}　onClick={() => {handleSeach(state.search_word)}} /> */}
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button variant={normal_variant} onClick={() => { setTagMode(false); }}>all</Button>
        <Button variant={tag_variant} onClick={() => { setTagMode(true); }}>タグごと</Button>
      </ButtonGroup>
      {isTagMode ?
        <FormControl className={classes.formControl}>
          {/*InputLabel id="demo-simple-select-label">タグを検索</InputLabel>*/}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchTag}
            onChange={handleTagChange}
            defaultValue="all"
          >
            <MenuItem value="all">全てを表示</MenuItem>
            {tags.map(tag => (
              <MenuItem value={tag}>{tag}</MenuItem>

            ))}
          </Select>
        </FormControl>
        :
        <></>}
      {/* <SelectWorkspace /> */}

      {isTagMode ?
        pageListsWithTag
        : <PageList pages={pages} withUpdate={withUpdate} />
      }


    </div>
  );
}

export default Home
{/**/ }

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
{/*{isTagMode ?*/ }
{/*:<PageList pages={state.pages} withUpdate={withUpdate} />}*/ }