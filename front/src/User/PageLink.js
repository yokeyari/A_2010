import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { trackPromise } from "react-promise-tracker"
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';


import UserInfoContext from "../context";
import Transition from "../Transition";
import { PageDataSource } from "../Main/ProductionApi";
import { PageAuther } from '../Auth/Authers';

const pageDataSource = new PageDataSource();

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
  card: {
    //maxWidth: 2000,
    //width: "23%",
    // width: '20vw',
    // minWidth:"25%",
    // maxWidth:"240px",
    // maxHeight: "100%",
    minHeight: "95%",
    margin: theme.spacing(1),
    position: "relative",
    //padding: theme.spacing(2),
  },

  media: {
    //height: 140,
    paddingTop: '56.25%',

  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,

  },

  button: {
    position: "absolute",
    top: 'auto',
    right: 0,
    bottom: 2,
    left: 'auto',
    //position: 'fixed',
  },
}));

const PREVIEW_MEMO_MAX = 30;
const PREVIEW_MEMO_NUM = 2;
const PREVIEW_TAG_NUM = 4;

export default function PageLink(props) {
  const PageApi = new PageDataSource();
  const [state, setState] = React.useState({
    url: "",
    title: "",
    to: "",
    isLoaded: false,
    isLoading: false
  })
  // const [url, setUrl] = useState("");
  // const [title, setTitle] = useState("");
  const { userInfo } = React.useContext(UserInfoContext);
  const pageAuther = new PageAuther(userInfo);
  const page = props.page;
  const img = props.img
  const classes = useStyles();


  const handleClick = () => {
    if (userInfo.workspace_id == "home") {
      setState({ to: `/${userInfo.id}/${page.id}`, isLoaded: true, isLoading: false })
    } else {
      setState({ to: `/${userInfo.id}/ws/${userInfo.workspace_id}/${page.id}`, isLoaded: true, isLoading: false })
    }
  }
  const handleDelete = (page) => {
    props.withUpdate(PageApi.deletePage(page));
  }

  // const handleClick = () => {
  //   setState({...state,isLoading:true});
  //   pageDataSource.getPage(page.id)
  //     .then(res => {
  //       if (res.statusText == "OK") {
  //         res.json()
  //           .then(page => {
  //             // console.log("getPage", page.page);
  //             setState({ to: `/${userInfo.id}/${page.page.id}`, isLoaded: true,isLoading:false });
  //             // props.onClose();
  //           })
  //       } else {
  //         // ここにページが読み込めなかったときの処理
  //       }
  //     });
  // }




  return (
    <>
      <Transition to={state.to} ok={state.isLoaded} isLoading={state.isLoading}>

      </Transition>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            //component="img"
            image={img}
            title="動画のサムネイル"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {page.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* {page.url} */}
              {

                  page.memos.slice(0, PREVIEW_MEMO_NUM).map((memo, i) => (
                    memo.text.slice(0, PREVIEW_MEMO_MAX)
                  ))

              }
              {
                page.tags.slice(0,PREVIEW_TAG_NUM).map(tag=>(
                  "#"+tag.text+' '
                ))
              }
            </Typography>
          </CardContent>
        </CardActionArea>
        {pageAuther.canDelete(page)  ? <Button className={classes.button} color="secondary" startIcon={<DeleteIcon />} onClick={() => { handleDelete(page) }}></Button> : <></>}
      </Card>
    </>
  )
}