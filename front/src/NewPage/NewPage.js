import React from 'react';
import Modal from '@material-ui/core/Modal';

import New from './PageForm';

function NewPage (){
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
	
	return(
		<div className="Create-NewPage-Modal">
			<button type="button" onClick={handleOpen}>
				New Memo
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle}> 
					<h2 id="">Create New memo</h2>
					<New/>
				</div>
			</Modal>
	</div>
	);
}
export default NewPage;