import React, { useContext, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import UserInfoContext from './context';
import { UserDataSource } from './Main/ProductionApi';

const userDataSource = new UserDataSource();

function Auth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { user_id } = useParams();
  console.log("p user id", user_id)
  console.log("Auth userInfo", userInfo);

  let isLogin = false;
  if(userInfo.isLogin==true) isLogin=true;


  useEffect(() => {
    if (false) {
    } else {
      userDataSource.isLogIn()
        .then(res => {
          console.log(res);
          if (res.statusText == "OK") {
            res.json()
              .then(res => {
                const user = res.user
                console.log("logged in user", user);
                if (user.id == user_id) console.log("match!!");
                setUserInfo({ ...userInfo, id: user_id ,isLogin:true })
              })
          } else {
            setUserInfo({ id: "" });
            // setUserInfo({ ...userInfo, id: "" ,isLogin:false })
          }
        })
    }
  }, []);

  useEffect(() => {

  }, [])

  // console.log("isLogin", isLogin);

  return (
     (isLogin ? props.children : <Redirect to={'/login'} />)
 );


  // return (token ? props.children : <Redirect to={'/login'} />)
}

export default Auth