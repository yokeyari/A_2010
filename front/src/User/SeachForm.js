import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CreateIcon from '@material-ui/icons/Create';
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import NewPage from './../NewPage/NewPage'

import UserInfoContext from '../context'

const useStyles = makeStyles((theme) => ({
  root: {
    //margin: '',
    //transition: theme.transitions.create('width'),
    padding: '10px 2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    //width: '50vw',

  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  formControl: {
    margin: theme.spacing(),
    //marginLeft: 'auto',
    float: 'right',
    minWidth: 120,
  },
  iconButton: {
    padding: 10,
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchForm(props) {
  const classes = useStyles();
  const { userInfo } = useContext(UserInfoContext);
  /*const seachField = <TextField
    type="text"
    value={props.search_word}
    onChange={(e) => { props.onChange(e.target.value) }}
  />;*/

  const seachButton = <Button onClick={props.onClick}>検索</Button>;
  return (
      <div className={classes.search}>
        {/*<Paper className={classes.root}>*/}

        <InputBase
          type="text"
          value={props.search_word}
          placeholder="Search Memos"
          onChange={(e) => { props.onChange(e.target.value) }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          variant="filled"
        />

        <Link to={`/${userInfo.id}/`}>
          <IconButton size="large" type="submit" className={classes.iconButton} onClick={props.onClick} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Link>

        {/*</Paper>*/}
      </div>
    
  )
}
{/*<FormControl className={classes.formControl} >
              <Select
                placeholder="タグ検索"

                value={selectedOption}
                onChange={this.handleChange}
                options={tags}
              />
  </FormControl>*/}

{/*{seachField}*/ }
{/*{seachButton}*/ }
  {/*<NewPage style={{ float: 'right' }} />*/}



      {/*</Box>*/}
      {/*{seachField}*/}
      {/*{seachButton}*/}

      {/* <Box className={classes.box}>
        <h2 className="User-name">Welcome {"user"}!</h2>
        <Paper style={{ float: 'right' }} >
          <InputBase
            width="50%"
            className={classes.input}
            placeholder="Search Memos"
            inputProps={{ 'aria-label': 'search memos' }}

          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box> */}