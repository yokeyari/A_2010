import React, { useEffect, useState } from "react";
import { UserDataSource, WorkspaceDataSource } from "../Main/ProductionApi"
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DoneIcon from '@material-ui/icons/Done';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Alert from '@material-ui/lab/Alert';


const UserApi = new UserDataSource();
const WorkspaceApi = new WorkspaceDataSource();

export default function Profile(props) {

  const [user, setUser] = useState({ name: "", username: "", email: "", pages: [], workspaces: [] });
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", username: "", email: "" })
  const [errorMessage, setErrorMessage] = useState({ name: "", username: "", email: "" })
  const [successMessage, setSuccessMessage] = useState("")
  const [isOpenAccountCloseBody, setIsOpenAccountCloseBody] = useState(null);
  const [reloader, setReloader] = useState(0);


  useEffect(() => {
    UserApi.getUser().then((res) => {
      res.json().then((user) => {
        setUser(user)
      })
    })
  }, [reloader])

  function withUpdate(fun) {
    fun.then(() => setReloader(reloader + 1));
  }

  const handleChangeEditMode = () => {
    if (editMode) {
      UserApi.updateUser({ name: profileForm.name, username: profileForm.username, email: profileForm.email }).then(res => {
        if (res.statusText == "OK") {
          setEditMode(false);
          setErrorMessage({ name: "", username: "", email: "" })
          setSuccessMessage("profile updated !")
        } else {
          res.json().then(error => setErrorMessage(error.errors))
        }
      })
    } else {
      setEditMode(true);
      setProfileForm({ name: user.name, username: user.username, email: user.email })
    }
  }

  const handleOpenBody = () => {
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
      <Link to="/" >
        <p><Button onClick={handleDeleteAccount}>confirm</Button></p>
      </Link> :
      null

  return (
    <div>
      <h2>プロフィールページ</h2>
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
          <TextField type="text" id="username-input" className="" onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })} value={profileForm.username} />
          {errorMessage.username ? <Alert severity="error">{errorMessage.username}</Alert> : null}
          <h4>email:</h4>
          <TextField type="text" id="email-input" className="" onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} value={profileForm.email} />
          {errorMessage.email ? <Alert severity="error">{errorMessage.email}</Alert> : null}
        </div> :
        <div>
          <h4>name: </h4>
          <p>{user.name}</p>
          <h4>account ID: </h4>
          <p>{user.username}</p>
          <h4>email: </h4>
          <p>{user.email}</p>
        </div>
      }

      <h3>your pages</h3>
      <ul>
        {user.pages.map(page =>
          <li key={page.id}>
            { !page.workspace_id ?
              <Link to={`/${user.id}/${page.id}`}>
                <p>{page.title} [ユーザーページ]</p>
              </Link> :
              <Link to={`/${user.id}/ws/${page.workspace_id}/${page.id}`}>
                <p>{page.title} [ワークスペース {page.workspace_id}]</p>
              </Link> }
          </li>
        )}
      </ul>

      <h3>your workspaces</h3>
      <ul>
        {user.workspaces.map(workspace_p =>
          <li key={workspace_p.workspace.id}>
            <Link to={`/${user.id}/ws/${workspace_p.workspace.id}`}>
              {workspace_p.workspace.name} ({workspace_p.permission})
            </Link>
            {workspace_p.permission!="owner"
              ? <Button onClick={handleQuitWorkspace} workspace_id={workspace_p.workspace.id} startIcon={<RemoveCircleOutlineOutlinedIcon />}></Button> 
              : null}
          </li>
        )}
      </ul>

      <Button onClick={handleOpenBody} startIcon={<CancelOutlinedIcon />}> close your account ...</Button>
      {accountCloseBody}
    </div>
  )
}