import React from 'react';
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import NewPageForm from './PageForm';
import { Button } from '@material-ui/core';

function NewPage() {
	const [open, setOpen] = React.useState(false);
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

	return (
		<div className="Create-NewPage-Modal">
			<Button variant="contained" color="primary" size="small" startIcon={<CreateIcon />} onClick={handleOpen}>
				New memo
			</Button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle}>
					<NewPageForm onClose={handleClose}/>
				</div>
			</Modal>
		</div>
	);
}
export default NewPage;