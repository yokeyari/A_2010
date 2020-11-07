import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import "./Login.css";
import logo from '../memotubelogo_orange_moji.png';
const useStyles = makeStyles((theme) => ({
	root: {
		opacity: 0.7,
		height: '100vh',
		textAlign: 'center',
		color: "#ffffff",
		marginTop: '50px',
		fontSize: '18px',
		letterSpacing: '2px'
	},
	midashi: {
		fontSize: '30px',
		letterSpacing: '5px'
	},
	img: {
		width: '230px'
	}
}));

function Promotion() {
	const classes = useStyles();
	return (

		<div className={classes.root} style={{ color: "#ffffff" }}>
			<h1 className={classes.midashi}>What's <img src={logo} className={classes.img} />?</h1>
			<p>
				<br />
				MemoTubeは動画を視聴しながらメモを取ることのできるWebアプリです。<br />
				動画内の時間とメモをリンクさせたり、そのメモを友達と共有できます!<br />
			</p>
			<video>
				<p>Demo movie</p>
			</video>
			<h2>Let's try it !!</h2>
			<p>
				皆さんもさっそくLoginしてMemoTubeを使い始めましょう!
			</p>

		</div>
	);
}
export default Promotion
