import React , { useState } from "react"
import Modal from '@material-ui/core/Modal';
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: "#e7ecec",
    padding: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}
));


function Dialog(props) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <IconButton onClick={handleOpenModal}>
        {props.icon}
        {props.actionMessage}
      </IconButton>

      <Modal
        open={isOpen}
        className={classes.modal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2>{props.modalMessage}</h2>
            <Button onClick={props.yesCallback} > {props.yesMessage} </Button>
            <Button onClick={handleCloseModal} > {props.noMessage} </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

function DoneDialog(props) {
  return (
    <Dialog
      modalMessage="送信しますか?"
      actionMessage="送信"
      yesCallback={props.yesCallback}
      yesMessage="送信"
      noMessage="キャンセル" />
  )
}

function DeleteDialog(props) {
  return (
    <Dialog
      modalMessage={ props.modalMessage ? props.modalMessage : "削除しますか?" }
      actionMessage={ props.actionMessage ? props.actionMessage : "削除" }
      yesCallback={props.yesCallback}
      yesMessage={props.yesMessage ? props.yesMessage : "削除"}
      noMessage="キャンセル"
      icon={<DeleteIcon color="secondary" />} />
  )
}

function QuitDialog(props) {
  return (
    <Dialog
      modalMessage={ props.modalMessage ? props.modalMessage : "退出しますか?" }
      actionMessage={ props.actionMessage ? props.actionMessage : "退出" }
      yesCallback={props.yesCallback}
      yesMessage={props.yesMessage ? props.yesMessage : "退出"}
      noMessage="キャンセル" />
  )
}

export { Dialog, DeleteDialog, DoneDialog, QuitDialog }