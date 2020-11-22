import React, { useContext, useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import NewPageForm from './PageForm';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import UserInfoContext from "../context";
import { PageAuther } from "../Auth/Authers"

const useStyles = makeStyles((theme) => ({
	fab: {
		margin: theme.spacing(2),
	},
	absolute: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(3),
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));
function NewPage() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const { userInfo } = useContext(UserInfoContext);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const modalStyle = {
		top: '60%',
		left: '60%',
		margin: '20vh 20vh',
	};

	console.log("before page auth",userInfo)
	const pageAuther = new PageAuther(userInfo);

	console.log("page auther ",userInfo)
	if (pageAuther.canCreate == false) {
		return null;
	} else {
		return (
			<div className="Create-NewPage-Modal">
				<Tooltip title="新規メモ作成">
					<Fab className={classes.fab} aria-label="新規作成" variant="round" color="primary" onClick={handleOpen}>
						<AddIcon fontSize="large" />
					</Fab>
				</Tooltip>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<Fade in={open}>
						<div style={modalStyle}>
							<NewPageForm onClose={handleClose} />
						</div>
					</Fade>
				</Modal>
			</div>
		);
	}


}
export default NewPage;