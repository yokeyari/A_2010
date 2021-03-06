// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Top from './Top/Top';
import UserHome from './User/UserHome';
import Footer from './Footer';
import Header from './Header';
import { useContext, useState } from 'react';
import { UserInfoContext, WSInfoContext, ReloaderContext } from './context';
import WSHome from "./Workspace/WSHome";
import Signup from './Top/Signup';
import Auth from './Auth/Auth';
import PageAuth from "./Auth/PageAuth";
import UserAuth from "./Auth/UserAuth";
import WSAuth from "./Auth/WSAuth";
// import { WSAuther } from './Auth/Authers';
import Main from './Main/Main';

import Analytics from "./Main/Analytics/Analytics";
import Profile from "./User/Profile"
import InviteWS from "./InviteWS"

function App() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    thema: "normal",
    token: null,
    isLogin: false,
    workspace_id: "home",
    permission: "owner",
    endCheck: false,
    homeLink: "/"
  })
  const [WSInfo, setWSInfo] = useState({
    active_ws_id: "",
    workspace_id: "",
    invite_token: "",
    workspaces: [],
  })
  const [reloader,setReload] = useState(false)
  const [search_word, setSearch_word] = useState("");

  const handleSearchChange = (value) => {
    setSearch_word(value);
  }

  return (
    <div>
    {/* <iframe width="640" height="480" src="https://www.youtube.com/embed/fx3g93Ocz0M" allow="autoplay"></iframe> */}
    {/* <iframe width="640" height="480" src="https://drive.google.com/file/d/1WZ65VSycurR3ClE6Z7GK_Rxr1s7qsm3h/preview" ></iframe> */}
      <ReloaderContext.Provider value={{ reloader, setReload }} >
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
          <WSInfoContext.Provider value={{ WSInfo, setWSInfo }}>
            <Router>
              <Header onChange={(value) => { handleSearchChange(value) }} />

              <Switch>
                <Route exact path='/' component={Top} />
                <Route exact path='/login' component={Top} />
                <Route exact path='/signup' component={Top} />
                <Route exact path='/page/:token'>
                  <PageAuth mode="token" />
                </Route>
                <Route exact path='/ws/:token' component={InviteWS} />




                <Route path='/:user_id'>
                  <UserAuth>
                    <Switch>

                      <Route exact path='/:user_id/'>
                        <WSAuth>
                          <UserHome search_word={search_word} />
                        </WSAuth>
                      </Route>
                      <Route exact path='/:user_id/profile'>
                        <Profile />
                      </Route>




                      <Route path='/:user_id/ws/:workspace_id'>
                        <WSAuth>
                          <>
                            <Route exact path='/:user_id/ws/:workspace_id'>
                              <WSHome search_word={search_word} />
                            </Route>

                            <Route exact path='/:user_id/ws/:workspace_id/:page_id'>
                              <PageAuth mode="user">
                                <Main />
                              </PageAuth>
                            </Route>
                          </>
                        </WSAuth>
                      </Route>

                      <Route exact path='/:user_id/:page_id'>
                        <PageAuth mode="user" >
                          <Main />
                        </PageAuth>
                      </Route>
                    </Switch>
                  </UserAuth>


                </Route>

              </Switch>

              <Footer />
            </Router>
          </WSInfoContext.Provider>
        </UserInfoContext.Provider>
      </ReloaderContext.Provider>
    </div >
  )
}

export default App;