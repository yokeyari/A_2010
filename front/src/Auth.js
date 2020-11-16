import React, { useContext, useEffect } from 'react'
import { Redirect,useParams } from 'react-router-dom'
import UserInfoContext from './context';
import {UserDataSource} from './Main/ProductionApi';

const userDataSource = new UserDataSource();

function Auth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { user_id } = useParams();
  console.log("p user id",user_id)

  // console.log("Auth userInfo", userInfo);
  // let token = userInfo.token;
  // const a = localStorage.getItem('user');
  // const user = JSON.parse(a);
 
  // if(!token && user) token=user.token
  // useEffect(()=>{
  //   if(!token && user){
  //     // console.log(user)
  //     setUserInfo(user)
  //   }
  // },[])

  // useEffect(() => {
  //   if (!userInfo.toekn) {
  //     localStorage.getItem('user').
  //   }
  // })
  userDataSource.isLogIn()
    .then(res => {
      console.log(res)
      if (res.statusText == "OK") {
        res.json()
          .then(user => {
            console.log("logged in user", user);
            return (user.id===user_id ? props.children : <Redirect to={'/login'} />)
          })
      } else {
        return (<Redirect to={'/login'} />);
      }
  });
  // return (token ? props.children : <Redirect to={'/login'} />)
}

export default Auth