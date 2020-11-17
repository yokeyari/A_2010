import React, { useState, useContext } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './memotubelogo_orange.png';
import Menu from "@material-ui/core/Menu";
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
//import { MemoryRouter as Router } from "react-router";
//import { Link as RouterLink } from "react-router-dom";
import { UserDataSource } from './Main/ProductionApi';
import LoginAuth from './Auth/LoginAuth';

import UserInfoContext from './context'



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
  logo :{
    height: "10vh",
    float:"left",
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
    width: '60vw'
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const UserApi = new UserDataSource();
  const classes = useStyles();

  const handleChangeSeachForm = (text) => {
    props.onChange(text);
    setState({ ...state, search_word: text })
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
    UserApi.logoutUser(userInfo.id);
  }


  return (
    <div className={classes.root}>
      <AppBar className={classes.root} color="primary" position="static" >
        <Toolbar>
          <Button component={Link} to={`/${userInfo.id}`}>
            <img src={logo} className={classes.logo} alt="memotube" />
          </Button>

          <Hidden xsDown>
            <SearchForm className={classes.search_make} onChange={handleChangeSeachForm} search_word={state.search_word} onClick={handleSeach} />
          </Hidden>

          <NewPage className={classes.search_make} />


          <div className={classes.right}>

            <LoginAuth/>
          </div>

        </Toolbar>
      </AppBar>

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