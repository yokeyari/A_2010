import React, { useState, useContext } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './memotubelogo.png';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
    //backgroundColor:"#cd853f"
    backgroundColor: "#7cfc00",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    marginLeft: 'auto',

  },
  search_make: {
    marginLeft: 'auto',
    //marginRight: 'auto'
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = useState({ search_word: "", pages: [] });
  const { userInfo, setUserInfo } = useContext(UserInfoContext);


  const handleChangeSeachForm = (text) => {
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
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar className={classes.root} color="default" position="static" >
        <Toolbar>
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
                <ListItemText primary="ユーザーページ" />
              </MenuItem>
            </Link>
            <Link to={`/${userInfo.id}/main`}>
              <MenuItem Button onClick={handleClose}>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="動画メモページ" />
              </MenuItem>
            </Link>
          </StyledMenu>

          <Button component={Link} to={`/${userInfo.id}`}>
            <img src={logo} className="header-logo" alt="memotube" />
          </Button>
          <SearchForm className={classes.search_make} onChange={handleChangeSeachForm} search_word={state.search_word} onClick={handleSeach} />
          <NewPage className={classes.search_make} />
          <Button color="inherit" component={Link} to='/login' className={classes.login}>Login</Button>
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