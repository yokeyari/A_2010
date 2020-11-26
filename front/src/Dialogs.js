import { useState } from "react"
import Modal from "react-modal";
import Button from '@material-ui/core/Button';

function BaseDialog(props) {

  return (
    <div>
      {props.children}
    </div>
  )
}

function Dialog(props) {
  const [isOpen, setIsOpen] = useState(false);

  const modalStyle = {
    overlay: {
      // position: "fixed",
      // position: "relative", 
      // margin: "auto",
      // padding: "auto",
      // top: "auto",
      // left: "auto",
      // right: "auto",
      // bottom: "auto",
      // top: 0,
      // left: 0,
      // backgroundColor: "rgba(0,0,0,0.85)"
    },
    content: {
      position: "absolute",
      top: "20rem",
      left: "30rem",
      right: "30rem",
      bottom: "20rem",
      // backgroundColor: "paleturquoise",
      borderRadius: "1rem",
      padding: "1.5rem"
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <BaseDialog>
      <Button onClick={handleOpenModal}>{props.actionMessage}</Button>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={modalStyle} >
        <Button onClick={props.yesCallback} > {props.yesMessage} </Button>
        <Button onClick={handleCloseModal} > {props.noMessage} </Button>
      </Modal>
    </BaseDialog>
  )
}

function DialogDone(props) {
  return (
    <Dialog
      actionMessage="送信しますか?"
      yesCallback={props.yesCallback}
      yesMessage="送信"
      noMessage="キャンセル" />
  )
}

function DialogDelete(props) {
  return (
    <Dialog
      actionMessage={ props.actionMessage ? props.actionMessage : "削除しますか?" }
      yesCallback={props.yesCallback}
      yesMessage={ props.yesMessage ? props.yesMessage : "削除" }
      noMessage="キャンセル" />
  )
}

export { DialogDone, DialogDelete }