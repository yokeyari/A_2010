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
  const classes=useStyles();
  const [searchTag, setSearchTag] = useState('');

  const handleChange = (event) => {
    setSearchTag(event.target.value);
  };
  
  //const handleChange = (event, newValue) => {
    //setValue(newValue);
  //};

  const tags = Array.from((pages => {
    let tags = new Set();
    (pages).forEach(page => {
      (page.tags).forEach(tag => tags.add(tag.text))
    })
    return tags
  })(state.pages));


  // const { user_id } = useParams();
  // const user = {...userInfo,id: user_id };

  // console.log("userinco",userInfo);
  // console.log("search",props.search_word)

  const loadPages = () => {

    if (props.search_word == "") {
      // ws_id?"home"???????
      pageDataSource.getPageIndex(user).then(pages=>{
      // workspaceDataSource.getPageIndex("home").then(res=>{
        if(pages===undefined){
          
        }else{
          setState({...state , pages:pages})
          console.log("----------");
          console.log(pages);
        }
      })

    } else {
      // ws_id?"home"???????
      pageDataSource.searchPage(user, props.search_word.split(' '), userInfo.workspace_id)
      // workspaceDataSource.searchPage("home", props.search_word.split(' '))
      .then(pages=>{
        // console.log(props.search_word)
        console.log("load page");
        setState({...state , pages:pages});
      })
    }
    // PageAPI.fetchMemos().then(json => { setState({ ...state, pages: json }) })
  }


  useEffect(() => {
    setUserInfo({...userInfo, workspace_id: "home", permission: "owner"});
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
  let tag_variant="";
  let normal_variant="contained";
  if(isTagMode){
    tag_variant="contained"
    normal_variant=""
  }
  let filteredpages = [];
  console.log("tag",tags)
  let filtered_tag;
  console.log("searchTag",searchTag)
  if(searchTag==="all"){
    filtered_tag=tags;
  }
  else{
    filtered_tag=[searchTag]
  }
  const pageListsWithTag =
    filtered_tag.map(tag => (
      filteredpages = [],
      <>
        <h1>{tag}</h1>
        {state.pages.map(page => (
          page.tags.map(e => (
            tag == e.text && filteredpages.push(page),
            <></>
          ))
        ))}
        <PageList pages={filteredpages} withUpdate={withUpdate} />
      </>
    ))
          

  return (
    <div className="User-Top">
      {/*className="User-To"*/}
      <h2 className="User-name">Welcome {userInfo.name}!</h2>
      {/* <SearchForm onChange={handleChangeSeachForm} search_word={state.search_word}　onClick={() => {handleSeach(state.search_word)}} /> */}
      <ButtonGroup  color="primary" aria-label="outlined primary button group">
        <Button variant={tag_variant} onClick={() => { setTagMode(true);setState({...state,search_word:""}) }}>タグごと</Button>
        <Button variant={normal_variant} onClick={() => { setTagMode(false);setState({...state,search_word:""}) }}>作った順</Button>

        
        
      </ButtonGroup>
      {isTagMode ?
      <FormControl className={classes.formControl}>
      {/*InputLabel id="demo-simple-select-label">タグを検索</InputLabel>*/}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={searchTag}
        onChange={handleChange}
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
      <SelectWorkspace />
   
    {isTagMode ?
      pageListsWithTag
      :<PageList pages={state.pages} withUpdate={withUpdate} />
      }
    

    </div>
  );
}

export default Home
{/**/}

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
{/*{isTagMode ?*/}
{/*:<PageList pages={state.pages} withUpdate={withUpdate} />}*/}