import logo from './logo.png';
// import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Top from './Top/Top';
import Home from './User/Home';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import UserInfoContext from './context';
import Signup from './Top/Signup';
import Auth from './Auth';
import PageAuth from "./PageAuth";

function App() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    thema: "normal",
    token: null
  })
  const [search_word, setSearch_word] = useState("");

  const handleSearchChange = (value) => {
    setSearch_word(value);
  }

  return (
    <div>
      {/* {console.log("userInfo", userInfo, "---------------")} */}
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        <Router>

          <Header onChange={(value) => { handleSearchChange(value) }} />

          <Switch>
            <Route exact path='/login' component={Top} />
            <Route exact path='/signup' component={Top} />
            <Route exact path='/page/:token'>
              <PageAuth mode="token"/>
            </Route>
            <Auth>
              <Switch>
                <Route exact path='/' component={Top} />
                <Route exact path='/:user_id'>
                  <Home search_word={search_word} />
                </Route>
                <Route path='/:user_id/:page_id'>
                  <PageAuth mode="user"/>
                </Route>
              </Switch>
            </Auth>
          </Switch>

          <Footer />

        </Router>

      </UserInfoContext.Provider>
    </div>
  )
}

export default App;