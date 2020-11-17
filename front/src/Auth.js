import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import UserInfoContext from './context';
import { UserDataSource } from './Main/ProductionApi';

const userDataSource = new UserDataSource();

function Auth(props) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { user_id } = useParams();
  const [isMatch, setIsMatch ] = useState(true);

  console.log("p user id", user_id)
  console.log("Auth userInfo", userInfo);

  const isLogin = (userInfo.isLogin == true) ? true : false;


  useEffect(() => {
    if (userInfo.id != user_id) {
      userDataSource.isLogIn()
        .then(res => {
          console.log(res);
          if (res.statusText == "OK") {
            res.json()
              .then(res => {
                const user = res.user
                console.log("logged in user", user);
                if (user.id == user_id) {
                  console.log("match");
                  setUserInfo({ ...userInfo, id: user_id, isLogin: true });
                  setIsMatch(true);
                  console.log(userInfo);
                } else {
                  console.log("no match user")
                  setIsMatch(false);
                  setUserInfo({ id: "", isLogin: false })
                }
              })
          } else {
            console.log("set user none")
            setIsMatch(false);
            setUserInfo({ id: "", isLogIn: false });
            // setUserInfo({ ...userInfo, id: "" ,isLogin:false })
          }
        })
    }
  }, []);

  return (
    (isLogin ? props.children :
      !isMatch ? <Redirect to={'/login'} /> : null)
  );


  // return (token ? props.children : <Redirect to={'/login'} />)
}

export default Auth