import React, { useEffect, useContext,useRef } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import UserInfoContext from './context'
import { UserDataSource } from './Main/ProductionApi';

const userDataSource = new UserDataSource();

function GoogleAuth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const auth = useRef(null);

  const authCheck = () => {
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
        console.log(userInfo)
        // setUserInfo({ ...userInfo, isLogin: auth.current.isSignedIn.get() });
        
      })
    });
  }

  useEffect(() => {
    authCheck();
  },[])

  //  auth.current.isSignedInのリスナー関数
  // Stateの更新をする
  const onAuthChange = (val) => {
    console.log("google auth",userInfo)
    // setUserInfo({ ...userInfo, isLogin: auth.current.isSignedIn.get() });
    if (val) {
      console.log('current user', auth.current.currentUser.get().getBasicProfile());
      console.log('auth response', auth.current.currentUser.get().getAuthResponse());
      const id_token = auth.current.currentUser.get().getAuthResponse().id_token;
      const name = auth.current.currentUser.get().getBasicProfile().getName();

      //login して返ってきたuserのidのページに移動する 
      userDataSource.loginUser(id_token, name)
        .then(res => {
          if (res.statusText == "OK") {
            res.json()
              .then(user => {
                console.log('response user', user);
                props.history.push(`/${user.user.id}/`);
              })
          } else {
            console.log(res);
            // TODOここにログインできなかったときの処理
          }
        });
      //  props.history.push('/1/');
    } else {
      console.log("pushed")
      props.history.push('/');
    }
  }

  // 正確には、クリックしただけでサインインはできていないので、アクションの名前にClickをつける
  const onSignInClick = () => {
    console.log(auth)
    //  authCheck();
    auth.current.signIn();
  };
  const onSignOutClick = () => {
    console.log(auth)
    auth.current.signOut();
    //  authCheck();
    props.history.push('/');
  }

  // ヘルパー
  // stateによって、表示される情報を切り替える
  const renderAuthButton = () => {
    if (userInfo.isLogin === null) {
      return null;
    } else if (userInfo.isLogin) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out With Google
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  // 実際のレンダリング
  return (
    <div>
      { renderAuthButton()}
    </div>
  );

}

export default withRouter(GoogleAuth); 