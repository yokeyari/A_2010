import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Main from './Main/Main';
import Top from './Top/Top';
import Home from './User/Home';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import UserInfoContext from './context';

function App() {
  const [userInfo, setUserInfo] = useState({
    id: "user_id",
    thema: "normal"
    // token?
  })

  return (
    <div>
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        <Router>

          <Header />

          <Switch>
            <Route exact path='/' component={Top} />
            <Route exact path='/login' component={Top} />
            <Route exact path='/:user_id' component={Home} />
            <Route path='/:user_id/:page_id' component={Main} />
          </Switch>

          <Footer />
          
        </Router>

      </UserInfoContext.Provider>
    </div>
  )
}

export default App;