import React from 'react';
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import New from './PageForm';
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
		margin: '30vh 20vh',
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
					<h2 id="">Create New memo</h2>
					<New />
				</div>
			</Modal>
		</div>
	);
}
export default NewPage;