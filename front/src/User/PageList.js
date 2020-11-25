import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import PageLink from './PageLink'
import { Button, responsiveFontSizes } from '@material-ui/core';
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
  formControl: {
    margin: theme.spacing(),
    //marginLeft: 'auto',
    float: 'right',
    minWidth: 120,
  },

  grid: {
    minWitdh: 600,
    maxWidth: "90%",
    //maxHeight: '60vh', 
    //overflow: 'auto' ,
    padding: '10px',
    //backgroundColor: "#008080" ,
    //backgroundColor:"#4169e1"
    //困ったらここを解除してどこがgridになっているかを確認
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
export default function PageList(props) {
  const classes = useStyles();

  const pages = props.pages.sort((a, b) => b.id - a.id);

  const render_pages = pages.map(page => {
    var id = "", img = "";
    if (page.url && page.url.split('v=').length === 2) {
      id = page.url.split('v=')[1];
      img = "https://img.youtube.com/vi/" + id + "/mqdefault.jpg"
      //youtubeの場合はこれで取れるはず
    }

    return (
      <Grid item xs={10} md={3} key={page.id}>
        <PageLink
          page={page}
          img={img}
          withUpdate={props.withUpdate}
        />
      </Grid>
    )
  });

  return (
    // ここにGridとかを定義する感じ？ 
    <Grid className={classes.grid}
      container
      direction="row"
    // justify="flex-start"
    //alignItems="flex-start"
    >
      {/* <Grid item xs={12} md={4}> */}
      {render_pages}
      {/* </Grid> */}

    </Grid>
  )

}