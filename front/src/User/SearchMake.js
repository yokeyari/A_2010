import React from 'react';
import './User.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Select from 'react-select';
const useStyles = (theme) => ({
    root: {
      //margin: '',
      padding: '2px 4px',
      display: 'flex',
      justify: 'flex-end',
      alignItems: 'center',
      justifyContent: 'right',
      //width: 400,
  
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
  });
class SearchMake extends React.Component {
    render(){
        const { classes } = this.props;
        
    return(
        <div>
        {/*ここからトップページ(検索、新規作成など)*/}
        <Box className={classes.root} style={{ backgroundColor: "#87CEFA" }}>
          <h2 className="User-name">Welcome {"user"}!</h2>
          {/*<FormControl className={classes.formControl} >
            <Select
              placeholder="タグ検索"

              value={selectedOption}
              onChange={this.handleChange}
              options={tags}
            />
    </FormControl>*/}
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
          <Button style={{ float: 'right' }} variant="contained" color="primary" size="small" startIcon={<CreateIcon />} >新規作成</Button>

        </Box>

      </div>
    )

    }
}
export default withStyles(useStyles)(SearchMake)