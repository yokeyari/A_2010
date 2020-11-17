import React, { useContext, useEffect, useState, useRef } from 'react'
import { Redirect, useParams, withRouter } from 'react-router-dom'
import UserInfoContext from '../context';
import { UserDataSource } from '../Main/ProductionApi';

const userDataSource = new UserDataSource();

function LoginAuth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [endCheck, setEndCheck] = useState(false);
  const auth = useRef(null);


  const isLogin = (userInfo.isLogin == true) ? true : false;

  useEffect(() => {
    initGAPI();
  }, []);

  // useEffect(() => {
  //   if (userInfo.id != user_id) {
  //     userDataSource.isLogIn()
  //       .then(res => {
  //         console.log(res);
  //         if (res.statusText == "OK") {
  //           res.json()
  //             .then(res => {
  //               const user = res.user
  //               console.log("logged in user", user);
  //               if (user.id == user_id) {
  //                 console.log("match");
  //                 setUserInfo({ ...userInfo, id: user_id, isLogin: true });
  //                 setEndCheck(true);
  //                 console.log(userInfo);
  //               } else {
  //                 console.log("no match user")
  //                 setEndCheck(true);
  //                 setUserInfo({ id: "", isLogin: false })
  //               }
  //             })
  //         } else {
  //           console.log("set user none")
  //           setEndCheck(true);
  //           setUserInfo({ id: "", isLogIn: false });
  //           // setUserInfo({ ...userInfo, id: "" ,isLogin:false })
  //         }
  //       })
  //   }
  // }, []);



  const sendLoginState = () => {
    console.log('current user', auth.current.currentUser.get().getBasicProfile());
    console.log('auth response', auth.current.currentUser.get().getAuthResponse());
    const id_token = auth.current.currentUser.get().getAuthResponse().id_token;
    const name = auth.current.currentUser.get().getBasicProfile().getName();
    //login して返ってきたuserのidのページに移動する 
    userDataSource.loginGoogleUser(id_token, name)
      .then(res => {
        if (res.statusText == "OK") {
          res.json()
            .then(user => {
              console.log('response user', user);
              setUserInfo({ ...userInfo, isLogin: auth.current.isSignedIn.get() });
              props.history.push(`/${user.user.id}/`);
            })
        } else {
          console.log(res);
          // TODOここにログインできなかったときの処理
        }
      });
    //  props.history.push('/1/');
  }


  const initGAPI = () => {
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
        sendLoginState();
      })
    });
  }

  function onAuthChange(val) {
    console.log("google auth", userInfo)
    // setUserInfo({ ...userInfo, isLogin: auth.current.isSignedIn.get() });
    if (val) {
      sendLoginState();
    } else {
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


  // stateによって、表示される情報を切り替える
  function renderAuthButton() {
    if (userInfo.isLogin === null) {
      return null;
    } else if (false || userInfo.isLogin) {
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
      {(!endCheck ? null :
        !isLogin ? <Redirect to={'/login'} /> : null)}
    </div>
  );


}

export default withRouter(LoginAuth)