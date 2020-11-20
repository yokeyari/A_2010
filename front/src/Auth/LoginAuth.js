import React, { useContext, useEffect, useState, useRef } from 'react'
import { Redirect, useParams, withRouter, Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import UserInfoContext from '../context';
import { UserDataSource } from '../Main/ProductionApi';

const userDataSource = new UserDataSource();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#4F5D75" //青っぽい黒でいい感じ
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));




function LoginAuth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const classes = useStyles();

  const isLogin = (userInfo.isLogin == true) ? true : false;

  useEffect(() => {
    console.log("start auth")
    userDataSource.isLogIn().then(res => {
      console.log("first login check", res);
      if (res.statusText == "OK") {
        res.json().then(user => {
          // const user = res.user
          console.log("logged in user", user);
          setUserInfo({ ...userInfo, endCheck: true, id: user.id, name: user.name, isLogin: true });
        })
      } else {
        setUserInfo({ ...userInfo, endCheck: true, isLogin: false });
      }
    })
  }, []);


  // 正確には、クリックしただけでサインインはできていないので、アクションの名前にClickをつける
  const onSignInClick = () => {

  };
  const onSignOutClick = () => {
    userDataSource.logoutUser().then((res) => {
      console.log(res)
      setUserInfo({ endCheck: true, id: "", name: "", isLogin: false });
      props.history.push('/login');
    });
  }


  // stateによって、表示される情報を切り替える
  function renderAuthButton() {
    if (userInfo.isLogin === null) {
      return null;
    } else if (userInfo.isLogin) {
      return (
        <Button color="inherit" onClick={onSignOutClick} className={classes.rightLink}>Logout</Button>
      );
    } else {
      return (
        <Button color="inherit" component={Link} to='/login' className={classes.rightLink} onClick={onSignInClick} >Login</Button>
      );
    }
  }

  // 実際のレンダリング
  return (
    <div>
      { renderAuthButton()}
      {(!userInfo.endCheck ? null :
        !isLogin ? <Redirect to={'/login'} /> : null)}
    </div>
  );


}

export default withRouter(LoginAuth);

