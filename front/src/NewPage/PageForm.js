import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CardActions } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
	root: {
		minWidth:300,
		//flexGrow: 1,
		maxHeight: 500,
		overflow: 'auto',
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
	button :{
		marginLeft:'auto',
	}
}
));

function New (props) {
	const [text, setText] = useState("");
  const classes = useStyles();
  const handleOnclick = () => {
    props.onSubmit({body:text});
    setText("");
	}
	
	return(
		<Card>
		<div>
			<TextField type="text" id="memo-input" className={classes.root} 
                label="Title"
                placeholder="Introduction of memotube"
                multiline
                onChange={e=>setText(e.target.value)} value={text}/>
      <TextField type="text" id="memo-input" className={classes.root} 
                label="URL"
                placeholder="http://??????????"
                multiline
                onChange={e=>setText(e.target.value)} value={text}/>
      
			<Link to='/main'>
				<Button className={classes.button} id="submit" 
								variant="contained" color="primary" endIcon={<SendIcon/>} 
								// onClick={handleOnclick}
								>submit
				</Button>
			</Link>
		
		</div>
		</Card>
	)
}

export default New;