import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import {UserDataSource} from './Main/ProductionApi';

const userDataSource = new UserDataSource();

class GoogleAuth extends React.Component{

  state = { isSignedIn: false };

  authCheck() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1067371292574-gg50a0rilqkk188icegdc79t60gau1s7.apps.googleusercontent.com', /* 自分が作成したIDを入力　*/
        scope: 'email'
        // thenを使用することで、処理が成功した場合のみ、処理を進めることができる
      }).then(() => {
        // APIで使用されるメソッド
        // OAuthを使用してログインするかをクライアントに投げる
        this.auth = window.gapi.auth2.getAuthInstance();
        // Stateとして、サインインの情報を保存する
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  componentDidMount(){
    this.authCheck();
  }

  // this.auth.isSignedInのリスナー関数
  // Stateの更新をする
  onAuthChange = (val) => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    if (val) {
      console.log('current user', this.auth.currentUser.get().getBasicProfile());
      console.log('auth response', this.auth.currentUser.get().getAuthResponse());
      const id_token = this.auth.currentUser.get().getAuthResponse().id_token;
      const name = this.auth.currentUser.get().getBasicProfile().getName();

      //login して返ってきたuserのidのページに移動する 
      userDataSource.loginUser(id_token, name)
        .then(res => {
          if (res.statusText == "OK") {
            res.json()
              .then(user => {
                console.log(user);
                this.props.history.push(`/${user.id}/`);
              })
          } else {
            console.log(res);
            // TODOここにログインできなかったときの処理
          }
        });
      // this.props.history.push('/1/');
    } else {
      this.props.history.push('/');
    }
  }

  // 正確には、クリックしただけでサインインはできていないので、アクションの名前にClickをつける
  onSignInClick = () => {
    // this.authCheck();
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
    // this.authCheck();
    this.props.history.push('/');
  }

  // ヘルパー
  // stateによって、表示される情報を切り替える
  renderAuthButton() {
    if (this.state.isSignedIn === null){
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out With Google
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

// 実際のレンダリング
  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
}

export default withRouter(GoogleAuth); 