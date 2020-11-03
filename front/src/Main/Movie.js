import React from 'react';
import Memo from './Memo';
//import WriteMemo from './WriteMemo'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import { render } from 'react-dom';
import Duration from './Duration';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    textAlign: 'left',
    //backgroundColor: "#ADD8E6"
  },
  card: {
    maxWidth: 600,
    maxHeight: 500,
    overflow: 'auto',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    //backgroundColor:"#D2B48C",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      controls: true,
      played: 0,
      duration: 0,
      memo: '',
      isSubmitted: false,
      time: 0,
      memo_List: []
    };
  }
  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }


  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
    //return (console.log(parseFloat(e.target.value)))
  }
  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }
  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }
  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  handleMemoChange(event) {
    const inputValue = event.target.value;
    console.log(inputValue)
    this.setState({ memo: inputValue });
  }
  handleSubmit(list, value, time) {
    //const memoTime = <Duration seconds={duration*played} />
    //this.setState({ isSubmitted: true });
    if (value != '') {
      var tmp = list.slice(0, list.length)
      tmp.push({ memo: value, time: time })
      //return tmp
      this.setState({ memo_List: tmp })
      //this.setState({print_memo:this.state.memo})
      this.setState({ memo: "" });
    }

  }
  deleteMemo() {
    this.setState({ memo: "" });
  }
  saveMemo() {
    //なんか保存
  }
  render() {
    const { classes } = this.props;
    const { url, controls, played, duration } = this.state;
    let error_message = "";
    if (this.state.memo == "") {
      error_message = (
        <Box color="error.main">メモが書かれていません</Box>

      );
    }
    else {
      error_message = ""
    }
    return (
      <div classname="all" style={{/*backgroundColor:"#D2B48C", */padding: "10px" }}>
        <Grid container className={classes.root}>
          <div classname="movie">
            <Grid item >
              <ReactPlayer
                className={classes.root}
                url={url}
                controls={controls}
                onDuration={this.handleDuration}
                onPlay={this.handlePlay}
                onProgress={this.handleProgress}
              />

              <input className={classes.root} style={{ width: "500px" }} ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
              <Button variant="contained" color="default" startIcon={<CloudUploadIcon />} onClick={() => this.setState({ url: this.urlInput.value })}>Load</Button>

              <tr>
                <tr>
                  <th>動画の長さ</th>
                  <td><Duration seconds={duration} /></td>
                  {/*</tr>
                <tr>*/}
                  <th>今の時間</th>
                  <td><Duration seconds={duration * played} /></td>
                </tr>
              </tr>
            </Grid>
          </div>
          <div className="メモ履歴">
            <Grid item>
              <Card className={classes.card} style={{ width: "500px", margin: "5px" }}>
                {this.state.memo_List.map((memoItem) => {
                  return (

                    <Memo
                      saved_memo={memoItem.memo}
                      time={memoItem.time}
                    />
                  )

                }
                )
                }
                {/*<CardActions>
            <Button variant="contained" color="primary" size="small" startIcon={<EditIcon />} onClick={() => { this.handleSubmit() }}>メモを編集</Button>
            <Button variant="contained" color="primary" size="small" startIcon={<DeleteIcon />} onClick={() => { this.deleteMemo() }}>メモを削除</Button>
            </CardActions>
            */}
                <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} onClick={() => { this.saveMemo() }}>メモを保存</Button>
              </Card>
            </Grid>
          </div>
        </Grid>
        <div className="memo">
          <Grid item xs={6}>
            <Card className={classes.card} style={{ width: "500px" }}>
              <TextField
                className={classes.root}
                style={{ backgroundColor: "white" }}
                value={this.state.memo}
                id="outlined-textarea"
                label="メモを入力してください"
                placeholder="見所"
                multiline
                variant="outlined"
                onChange={(event) => { this.handleMemoChange(event) }}
              />
              <div>
                <CardActions>
                  今の時間: {<Duration seconds={duration * played} />}
                  <Button style={{ marginLeft: 'auto' }} variant="contained" color="secondary" size="small" startIcon={<DeleteIcon />} onClick={() => { this.deleteMemo() }}> 削除</Button>
                  <Button style={{ float: 'left' }} variant="contained" color="primary" size="small" endIcon={<SendIcon />} onClick={() => { this.handleSubmit(this.state.memo_List, this.state.memo, <Duration seconds={duration * played} />) }} >送信</Button>
                </CardActions>
                {error_message}
              </div>
            </Card>
          </Grid>
        </div>
      </div>

    );
  }
}
export default withStyles(useStyles)(Movie);