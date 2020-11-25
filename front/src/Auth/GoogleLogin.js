import React, { useContext, useEffect, useState, useRef } from 'react'
import { Redirect, useParams, withRouter } from 'react-router-dom'
import {UserInfoContext} from '../context';
import { UserDataSource } from '../Main/ProductionApi';

import Button from '@material-ui/core/Button';
import blue_logo from '../btn_google_signin_dark_pressed_web.png'
const userDataSource = new UserDataSource();

function GoogleLogin(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const auth = useRef(null);

  const sendLoginState = (redirect_url="") => {
    console.log('current user', auth.current.currentUser.get().getBasicProfile());
    console.log('auth response', auth.current.currentUser.get().getAuthResponse());
    const id_token = auth.current.currentUser.get().getAuthResponse().id_token;
    const name = auth.current.currentUser.get().getBasicProfile().getName();
    //login して返ってきたuserのidのページに移動する 
    userDataSource.loginGoogleUser(id_token, name)
      .then(res => {
        auth.current.signOut();
        if (res.statusText == "OK") {
          res.json()
            .then(user => {
              console.log('response user', user);
              setUserInfo({ ...userInfo, endCheck: true, id: user.id, name: user.name, isLogin: true });
              if(redirect_url==""){
                props.history.push(`/${user.id}/`);
              }else{
                props.history.push(redirect_url);
              }
            })
        } else {
          console.log(res);
          // TODOここにログインできなかったときの処理
        }
      });
    //  props.history.push('/1/');
  }


  useEffect(() => {
    const initGAPI = () => {

      function onAuthChange(val) {
        console.log("google auth", val)
        if (val) {
          if(props.redirectURL){
            sendLoginState(props.redirectURL);
          }else{
            sendLoginState();
          }
        } else {
          // setUserInfo({endCheck: true, id: "", name: "", isLogin: false });
          // props.history.push('/');
        }
      }

      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId: '1067371292574-gg50a0rilqkk188icegdc79t60gau1s7.apps.googleusercontent.com', /* 自分が作成したIDを入力　*/
          scope: 'email'
          // thenを使用することで、処理が成功した場合のみ、処理を進めることができる
        }).then(() => {
          // APIで使用されるメソッド
          // OAuthを使用してログインするかをクライアントに投げる
          auth.current = window.gapi.auth2.getAuthInstance();
          // Stateとして、サインインの情報を保存する
          auth.current.isSignedIn.listen(onAuthChange);

          // TODO そもそもここいらない
          if (auth.current.isSignedIn.get()) {
            //TODO おそらくここは来ない設計になったので後に消す
            console.log("already logined")
            sendLoginState();
          } else {
            setUserInfo({ ...userInfo, endCheck: true });
          }
        })
      });
    }

    initGAPI();

  }, [props.redirectURL]);



  // 正確には、クリックしただけでサインインはできていないので、アクションの名前にClickをつける
  const onSignInClick = () => {
    console.log(auth)
    auth.current.signIn();
  };

  // 実際のレンダリング
  return (
      <Button onClick={onSignInClick}>
        <img src={blue_logo} alt="google" />
      </Button>
  );


}

export default withRouter(GoogleLogin)