import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import UserInfoContext from './context';

function Auth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  console.log("Auth userInfo", userInfo);
  return (userInfo.token ? props.children : <Redirect to={'/login'}/>)
}

export default Auth