import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  root: {
    //margin: '',
    padding: '2px 4px',
    display: 'flex',
    justify: 'flex-end',
    alignItems: 'center',
    justifyContent: 'right',
    //width: 400,

  },
  box: {
    backgroundColor: "#87CEFA" ,
    padding: '2px 4px',
    display: 'flex',
    //justify: 'flex-end',
    marginLeft:'auto',
    alignItems: 'center',
    //justifyContent: 'right',
  },
  formControl: {
    margin: theme.spacing(),
    //marginLeft: 'auto',
    float: 'right',
    minWidth: 120,
  },
  card: {
    //maxWidth: 2000,
    //width: "23%",
    width: '23vw',
    height: "20%",
    margin: theme.spacing(1),
    //padding: theme.spacing(2),
  },
  media: {
    //height: 140,
    paddingTop: '56.25%'
  },
  input: {
    marginLeft: theme.spacing(3),
    flex: 1,
    //maxWidth:400
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchForm(props) {
  const classes=useStyles();
  /*const seachField = <TextField
    type="text"
    value={props.search_word}
    onChange={(e) => { props.onChange(e.target.value) }}
  />;*/
  
  const seachButton = <Button onClick={props.onClick}>検索</Button>;
  return (
    <div>
      {/*{seachField}*/}
      {/*{seachButton}*/}
      
          <Box className={classes.box}>
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
            <Button style={{ float: 'right' }} variant="contained" color="primary" size="small" startIcon={<CreateIcon />} >
              <a href='./main'>New</a>
              </Button>

          </Box>
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