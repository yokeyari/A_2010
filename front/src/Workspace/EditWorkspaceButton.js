import React, { useState, useContext } from 'react';
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
import UserInfoContext from '../context';

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
  const [initFields, setInitFields] = useState({name: null, users: [{user_id: null, permission: null}]})
  const {userInfo, setUserInfo} = useContext(UserInfoContext);


  const getInitFields = () => {
    // 本番用 要API確認
    workspaceDataSource.getWorkspace(userInfo.workspace_id).then(res => {
      res.json().then(workspace => {
		console.log("get workspace", workspace);
		const name = workspace.name
		setInitFields({...initFields, name: name});
      })
    })
    workspaceDataSource.getWorkspaceUsers(userInfo.workspace_id).then(res => {
      res.json().then(user_p_list => {
		console.log("get workspace user and permission", user_p_list);
		const id_p_list = user_p_list.map((user_p) => { return {user_id: user_p.user.id, permission: user_p.permission} })
        setInitFields({...initFields, users: id_p_list});
      })
    })

    // // テスト用
	// setInitFields({users: [{user_id: "test", permission: "general"}]});
	// console.log("aaaaaa", initFields);
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