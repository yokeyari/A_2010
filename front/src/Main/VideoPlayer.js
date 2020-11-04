import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
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
  video: {
    //width: '30vw',
    maxHeight: '60vh',
    overflow: 'auto',
    margin: theme.spacing(1),
   // padding: theme.spacing(0),
    //backgroundColor:"#ffffff",
  },
}
);



class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      controls: true,
      played: 0.3,
      duration: 0,
      pip: false,
      playing: true,
      light: false,
      volume: 0.8,
      muted: false,
      loaded: 0,
      playbackRate: 1.0,
      loop: false
    };
    if(props.url==null){
      this.state.url = 'https://www.youtube.com/watch?v=YE7VzlLtp-4'
    }else{
      this.state.url = props.url
    }
  }

  onProgress = prog => {
    // console.log('onProgress', prog)
    // console.log('this state', this.state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(prog);
      // console.log('pre players:',this.props.players.player)
      this.props.players.setPlayer({...this.props.players.player,time:prog.playedSeconds});
      // console.log('players:',this.props.players.player)
    }
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
  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  ref = player => {
    // console.log('set ref',player);
    this.player = player
    this.props.players.setPlayer({...this.props.players.player,player:{player}})
  }

  renderCntrols = () => {
    const loadButton = (url, label) => {
      return (
        <button onClick={() => this.load(url)}>
          {label}
        </button>
      )
    }

    const seekBar = (
      <input
        style={{minWidth:'100%'}}
        type='range' min={0} max={0.999999} step='any'
        value={this.state.played}
        onMouseDown={this.handleSeekMouseDown}
        onChange={this.handleSeekChange}
        onMouseUp={this.handleSeekMouseUp}
      />
    );


    return (
      <div>
        {seekBar}
      </div>
    )

  }

  // timer = this.context; 


  render() {
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    const {classes}=this.props;
    return (
      <div className={classes.video}>
        <ReactPlayer
          className='react-player'
          url={url}
          ref={this.ref}
          controls={true}
          onPlay={this.handlePlay}
          volume={volume}
          muted={muted}

          //width = '60vw'
          minWidth='800px'
          //height='60%'
          playing={playing}
          onProgress={this.onProgress}
          onPause={this.handlePause}
          onBuffer={() => console.log('onBuffer')}
        />

        {this.renderCntrols()}
      </div>
    )
  }
}



// class Video extends React.Component {
//   componentDidMount() {
//     this.forceUpdate();

//   }


//   render() {
//     return (
//       <div>
//         <video className="Main-video" id="video" controls>
//           <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
//         </video>
//         {/* <iframe className="Main-video" height="300" frameborder="0" 
//           src="https://www.youtube.com/embed/YKaWsA-tk6g" 
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
//         </iframe> */}
//         <button onClick={() => { document.getElementById('video').play() }}>Play</button>
//         <button onClick={() => { document.getElementById('video').pause() }}>Stop</button>
//         <button onClick={() => { document.getElementById('video').currentTime = 20 }}>Skip to 20s</button>

//       </div>

//     );
//   }

// }

export default withStyles(useStyles)(VideoPlayer);
