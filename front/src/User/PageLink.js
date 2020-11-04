import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
    width: '20vw',
    maxHeight: "20%",
    margin: theme.spacing(1),
    //padding: theme.spacing(2),
  },
  media: {
    //height: 140,
    paddingTop: '56.25%'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
export default function PageLink(props) {
  const page = props.page;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        {/* CardActionAreaでクリックするとidに基づいてメモページに飛べるようにしたい */}
        <CardMedia
          className={classes.media}
          //component="img"
          image={page.img}
          title="サムネ"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {page.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {page.url}
            メモの最初の1~2個{page.body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}