import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import UserInfoContext from './context';

function Auth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  // console.log("Auth userInfo", userInfo);
  let token = userInfo.token;
  const a = localStorage.getItem('user');
  const user = JSON.parse(a);
 
  if(!token && user) token=user.token
  useEffect(()=>{
    if(!token && user){
      // console.log(user)
      setUserInfo(user)
    }
  },[])

  // useEffect(() => {
  //   if (!userInfo.toekn) {
  //     localStorage.getItem('user').
  //   }
  // })
  return (token ? props.children : <Redirect to={'/login'} />)
}

export default Auth