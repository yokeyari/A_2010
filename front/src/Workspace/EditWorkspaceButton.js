import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import NewPageForm from '../NewPage/PageForm';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditWorkspace from './EditWorkspace';
import { WorkspaceDataSource } from '../Main/ProductionApi'

const workspaceDataSource = new WorkspaceDataSource();


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

function EditWorkspaceButton() {
	const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [initFields, setInitFields] = useState([{user_id: null, permission: null}])


  const getInitFields = () => {
    // 本番用
    // //ワークスペースの名前も取得
    // workspaceDataSource.getWorkspaceUser(userInfo.ws_id).then(res => {
    //   const users = res.users;
    //   setFields(users);
    // })

    // テスト用
    setInitFields([{user_id: "test", permission: "general"}]);
  }

	const handleOpen = () => {
    setOpen(true);
    getInitFields();
  };
  
	const handleClose = () => {
		setOpen(false);
	};

	const modalStyle = {
		top: '60%',
		left: '60%',
		margin: '20vh 20vh',
	};

	return (
		<div className="Create-NewPage-Modal">
			<Tooltip title="ワークスペース編集">
				<Button className={classes.fab} aria-label="ワークスペース編集" variant="contained" color="primary" onClick={handleOpen}>
					ワークスペース編集
				</Button>
			</Tooltip>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<Fade in={open}>
					<div style={modalStyle}>
						<EditWorkspace onClose={handleClose} initFields={initFields} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
export default EditWorkspaceButton;