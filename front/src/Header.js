import React, { useState, useContext } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './memotubelogo_orange.png';
import Menu from "@material-ui/core/Menu";
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchForm from './User/SeachForm';
import SearchIcon from '@material-ui/icons/Search';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { ThemeProvider } from '@material-ui/styles';
import NewPage from './NewPage/NewPage'
import EditWorkspaceButton from './Workspace/EditWorkspaceButton';
//import { MemoryRouter as Router } from "react-router";
//import { Link as RouterLink } from "react-router-dom";
import { UserDataSource } from './Main/ProductionApi';
import LoginAuth from './Auth/LoginAuth';
import SelectWorkspace from "./Workspace/SelectWorkspace";

import {UserInfoContext} from './context'



const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //margin: theme.spacing(1),
    //backgroundColor:"#191970",
    //color:"#696969"
    //backgroundColor:"#00ff7f"
    //backgroundColor:"#7cfc00",
    backgroundColor: "#4F5D75" //青っぽい黒でいい感じ
  },
  logo: {
    height: "10vh",
    float: "left",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  search_make: {
    //marginLeft: 'auto',
    //marginRight: 'auto'
    width: '100vw'
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  // const [state, setState] = useState({ search_word: "" });
  const { userInfo } = useContext(UserInfoContext);
  const [isSearchMode, setSearchMode] = useState(false);
  const UserApi = new UserDataSource();
  const classes = useStyles();

  const handleChangeSeachForm = (text) => {
    props.onChange(text);
    // setState({ ...state, search_word: text })
  }

  const handleSeach = () => {
    // サーチしてwithUpdateする．

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    // document.cookie = "_session_id=0";
    UserApi.logoutUser();
  }

  const Hamburger = (
    <>
      <IconButton variant="contained" onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={`/${userInfo.id}`} >
          <MenuItem button onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="ユーザーホーム" />
          </MenuItem>
        </Link>

        <Link to={`/${userInfo.id}/profile`} >
          <MenuItem button onClick={handleClose}>
            <ListItemIcon>
              {/* <PersonIcon /> */}
            </ListItemIcon>
            <ListItemText primary="プロフィール" />
          </MenuItem>
        </Link>
        <SelectWorkspace onClose={handleClose}/>
      </StyledMenu>
    </>)



  return (
    <div >
      <AppBar className={classes.root} color="primary" position="static" >
        <Toolbar>


          {Hamburger}
          <Button component={Link} to={userInfo.homeLink}>
            <img src={logo} className={classes.logo} alt="memotube" />
          </Button>

          <Hidden smDown>
            <SearchForm onChange={handleChangeSeachForm} search_word={props.search_word} onClick={handleSeach} />
          </Hidden>


            <div>
              <NewPage className={classes.search_make} />
              {/* {userInfo.workspace_id!="home" ? <EditWorkspaceButton /> : <></>} */}
            </div>
          <Hidden mdUp>
            {isSearchMode ?
              <>
                <Tooltip title="検索窓を非表示">
                  <IconButton color="inherit" type="submit" onClick={() => { setSearchMode(false) }} aria-label="search">
                    <SearchIcon />

                  </IconButton>
                </Tooltip>
              </>
              :
              <Tooltip title="検索窓を表示">
                <IconButton color="inherit" type="submit" onClick={() => { setSearchMode(true) }} aria-label="search">
                  <SearchIcon />

                </IconButton>
              </Tooltip>

            }

          </Hidden>
          <div className={classes.right}>

            <LoginAuth />
          </div>

        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        {isSearchMode ?
          <>
            <SearchForm className={classes.search_make} onChange={handleChangeSeachForm} search_word={props.search_word} onClick={handleSeach} />
          </>
          :
          <></>

        }
      </Hidden>
    </div>
  );
}



/*<div className="Top">
  <div className="Top-form">
    <h2>Login</h2>
    <input value="email"/>
    <input value="password"/>
  </div>
</div>*/
/*<header className="App-header">
  <a
    className="header-link"
    href="/home"
  >
    <img src={logo} className="header-logo" alt="memotube"/>
  </a>
  <a href="/login"  className="App-login">
      Login
  </a>
</header>*/
{/*<Button component={Link} to='/home'>
          User
  </Button>*/}