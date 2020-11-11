import React from "react";
import { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import "./Login.css";
import logo from '../memotubelogo_orange_moji.png';
import VideoPlayer from "../Main/VideoPlayer";
const useStyles = makeStyles((theme) => ({
	root: {
		opacity: 0.7,
		//height: '100vh',
		textAlign: 'center',
		color: 'rgba(255,255,255,0.7)',
		marginTop: '50px',
		fontSize: '18px',
		letterSpacing: '2px'
	},
	midashi: {
		fontSize: '30px',
		letterSpacing: '5px',
		opacity: 0.7,
		textAlign: 'center',
		marginTop: '50px',
	},
	img: {
		width: '230px'
	}
	,
	video: {
		opacity: 1.0,
		width: '80%',
		margin: 'auto'
	}
}));

function Promotion() {
	const classes = useStyles();
	const [player, setPlayer] = useState({
		time: 0,
		player: null,
		playing: false
	});
	const url = "https://www.youtube.com/watch?v=5g_SkXsIZvQ&feature=youtu.be";
	return (

		<div style={{ color: "#ffffff" }}>
			<h1 className={classes.midashi}>What's <img src={logo} className={classes.img} />?</h1>
			<p className={classes.root}>
				<br />
				MemoTubeは動画を視聴しながらメモを取ることのできるWebアプリです。<br />
				動画内の時間とメモをリンクさせたり、そのメモを友達と共有できます!<br />
			</p>
			<div className={classes.video}>
				<VideoPlayer url={url} players={{ player, setPlayer }} />
			</div>
			<h2 className={classes.root}>Let's try it !!</h2>
			<p className={classes.root}>
				皆さんもさっそくLoginしてMemoTubeを使い始めましょう!
			</p>

		</div>
	);
}
export default Promotion
