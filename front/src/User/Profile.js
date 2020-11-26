import React, { useEffect, useState } from "react";
import { UserDataSource, WorkspaceDataSource } from "../Main/ProductionApi"
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DoneIcon from '@material-ui/icons/Done';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { CommentSharp } from "@material-ui/icons";
const UserApi = new UserDataSource();
const WorkspaceApi = new WorkspaceDataSource();
const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: "#e7ecec",
    padding: theme.spacing(2)
  },
  card: {
    //maxWidth: 600,
    //maxHeight: 500,
    overflow: 'auto',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    //backgroundColor:"#D2B48C",
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
export default function Profile(props) {

  const [user, setUser] = useState({ name: "", account_id: "", email: "", pages: [], workspaces: [] });
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", account_id: "", email: "" })
  const [errorMessage, setErrorMessage] = useState({ name: "", account_id: "", email: "" })
  const [successMessage, setSuccessMessage] = useState("")
  const [isOpenAccountCloseBody, setIsOpenAccountCloseBody] = useState(null);
  const [reloader, setReloader] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsOpenAccountCloseBody(false)
  };

  useEffect(() => {
    UserApi.getUser().then((res) => {
      res.json().then((user) => {
        setUser(user)
        console.log(user)
      })
    })
  }, [reloader])

  function withUpdate(fun) {
    fun.then(() => setReloader(reloader + 1));
  }

  const handleChangeEditMode = () => {
    if (editMode) {
      UserApi.updateUser({ name: profileForm.name, account_id: profileForm.account_id, email: profileForm.email }).then(res => {
        if (res.statusText == "OK") {
          setEditMode(false);
          setErrorMessage({ name: "", account_id: "", email: "" })
          setSuccessMessage("profile updated !")
        } else {
          res.json().then(error => setErrorMessage(error.errors))
        }
      })
    } else {
      setEditMode(true);
      setProfileForm({ name: user.name, account_id: user.account_id, email: user.email })
    }
  }

  const handleOpenBody = () => {
    setOpen(true);
    isOpenAccountCloseBody ? setIsOpenAccountCloseBody(false) : setIsOpenAccountCloseBody(true)
  }

  const handleDeleteAccount = () => {
    withUpdate(UserApi.deleteUser(user.id));
  }

  const handleQuitWorkspace = (event) => {
    const workspace_id = event.currentTarget.getAttribute("workspace_id")
    withUpdate(WorkspaceApi.quitWorkspace(workspace_id));
  }
  const accountCloseBody =
    isOpenAccountCloseBody ?


      <Modal
        open={open}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open}>
          <div className={classes.paper}>

            <h2>本当に削除しますか？</h2>
            <div></div>
            <Button color="secondary" variant="contained" onClick={handleDeleteAccount}>削除</Button>

          </div>
        </Fade>
      </Modal>
      :
      null
  {/*<Link to="/" >*/ }
  {/*</Link>  これいる？*/ }
  return (
    <div className={classes.root}>
      <h2>プロフィールページ</h2>
      <Card className={classes.card}>
        <h3>basic profile
        {!editMode
            ? <Button onClick={handleChangeEditMode} startIcon={<EditIcon />}>edit</Button>
            : <Button onClick={handleChangeEditMode} startIcon={<DoneIcon />}>done</Button>}
        </h3>
        {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
        {editMode ?
          <div>
            <h4>name:</h4>
            <TextField type="text" id="name-input" className="" onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} value={profileForm.name} />
            {errorMessage.name ? <Alert severity="error">{errorMessage.name}</Alert> : null}
            <h4>account ID:</h4>
            <TextField type="text" id="account_id-input" className="" onChange={(e) => setProfileForm({ ...profileForm, account_id: e.target.value })} value={profileForm.account_id} />
            {errorMessage.account_id ? <Alert severity="error">{errorMessage.account_id}</Alert> : null}
            <h4>email:</h4>
            <TextField type="text" id="email-input" className="" onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} value={profileForm.email} />
            {errorMessage.email ? <Alert severity="error">{errorMessage.email}</Alert> : null}
          </div> :
          <div>
            <h4>name: </h4>
            <p>{user.name}</p>
            <h4>account ID: </h4>
            <p>{user.account_id}</p>
            <h4>email: </h4>
            <p>{user.email}</p>
          </div>
        }
      </Card>
      <Card className={classes.card}>
        <h3>your pages</h3>
        <ul>
          {user.pages.map(page =>
            <li key={page.id}>
              {!page.workspace_id ?
                <Link to={`/${user.id}/${page.id}`}>
                  <p>{page.title} [ユーザーページ]</p>
                </Link> :
                <Link to={`/${user.id}/ws/${page.workspace_id}/${page.id}`}>
                  <p>{page.title} [ワークスペース {page.workspace_id}]</p>
                </Link>}
            </li>
          )}
        </ul>
      </Card>
      <Card className={classes.card}>
        <h3>your workspaces</h3>
        <ul>
          {user.workspaces.map(workspace_p =>
            <li key={workspace_p.workspace.id}>
              <Link to={`/${user.id}/ws/${workspace_p.workspace.id}`}>
                {workspace_p.workspace.name} ({workspace_p.permission})
            </Link>
              {workspace_p.permission != "owner"
                ? <Button onClick={handleQuitWorkspace} workspace_id={workspace_p.workspace.id} startIcon={<RemoveCircleOutlineOutlinedIcon />}></Button>
                : null}
            </li>
          )}
        </ul>
      </Card>
      <Button onClick={handleOpenBody} startIcon={<CancelOutlinedIcon />}> Delete your account ...</Button>
      {accountCloseBody}
    </div>
  )
}