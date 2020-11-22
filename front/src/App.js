// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Top from './Top/Top';
import Home from './User/Home';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import UserInfoContext from './context';
import Workspace from "./Workspace/Workspace";
import Signup from './Top/Signup';
import Auth from './Auth/Auth';
import PageAuth from "./Auth/PageAuth";
import UserAuth from "./Auth/UserAuth";
import WSAuth from "./Auth/WSAuth";
// import { WSAuther } from './Auth/Authers';
import Main from './Main/Main';


function App() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    thema: "normal",
    token: null,
    isLogin: false,
    workspace_id: "home",
    permission: "owner",
    endCheck: false
  })
  const [search_word, setSearch_word] = useState("");

  const handleSearchChange = (value) => {
    setSearch_word(value);
  }

  return (
    <div>
      {console.log("userInfo", userInfo, "---------------")}
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        <Router>
          <Header onChange={(value) => { handleSearchChange(value) }} />

          <Switch>
            <Route exact path='/' component={Top} />
            <Route exact path='/login' component={Top} />
            <Route exact path='/signup' component={Top} />
            <Route exact path='/page/:token'>
              <PageAuth mode="token" />
            </Route>


            <Route path='/:user_id'>
              <UserAuth>
                <Switch>
                  <Route exact path='/:user_id/'>
                    <Home search_word={search_word} />
                  </Route>

                  <Route exact path='/:user_id/:page_id'>
                    <PageAuth mode="user" >
                      <Main />
                    </PageAuth>
                  </Route>

                  <Route path='/:user_id/ws/'>
                    <WSAuth>
                      <Switch>
                        <Route exact path='/:user_id/ws/:workspace_id'>
                          <Workspace search_word={search_word} />
                        </Route>

                        <Route exact path='/:user_id/ws/:workspace_id/:page_id'>
                          <PageAuth mode="user">
                            <Main />
                          </PageAuth>
                        </Route>
                      </Switch>
                    </WSAuth>
                  </Route>
                </Switch>
              </UserAuth>
            </Route>

          </Switch>

          <Footer />
        </Router>

      </UserInfoContext.Provider>
    </div>
  )
}

export default App;