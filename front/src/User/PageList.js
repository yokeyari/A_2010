import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import PageLink from './PageLink'
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

  grid:{
    minWitdh: 500, 
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
export default function PageList(props){
  const pages=[{ id: 0, title: "2nd single", img: "http://img.youtube.com/vi/qsureA57fEo/mqdefault.jpg" }, { id: 1, title: "面白い動画", img: "http://img.youtube.com/vi/HxKEgjUBDAs/mqdefault.jpg" }, { id: 2, title: "test3", img: "http://img.youtube.com/vi/cIrp_dfNbVs/mqdefault.jpg" }, { id: 4, title: "org", img: "./logo.svg" }
  ,
  { id: 5, title: "お気に入り", img: "http://img.youtube.com/vi/HxKEgjUBDAs/mqdefault.jpg" }, { id: 6, title: "微分", img: "http://img.youtube.com/vi/HxKEgjUBDAs/mqdefault.jpg" }, { id: 7, title: "lalala", img: "" }, { id: 7, title: "lalala", img: "" }, { id: 7, title: "lalala", img: "" }];
  //この定数はデバッグのために作ったので、実際は消してください
  //
  const classes=useStyles();
  //デバッグのためにprops.pages->pagesに書き換えたので、本番は戻してください
  const render_pages = pages.map(page=>{
    // ここにGridの要素とかを定義する感じ？
    // <Grid item>  とか？しらんけど．PageLinkの中身をいじっても良い．
    return (
      <PageLink
      key = {page.id}
      page= {page}
    />
    )
  });

  return(
    // ここにGridとかを定義する感じ？ 
    <Grid className={classes.grid}
      container  
      direction="row"
      //justify="flex-start"
      //alignItems="flex-start"
    >
      {render_pages}
    </Grid>
  )
  
}