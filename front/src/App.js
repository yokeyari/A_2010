import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Main from './Main/Main';
import Top from './Top/Top';
import Home from './User/Home';
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
          <div>
            <header className="App-header">
              <Link to='/' className="header-link">
                <img src={logo} className="header-logo" alt="memotube" />
              </Link>
              <Link to='/login' className="App-login">
                Login
              </Link>
            </header>
          </div>

          <div>
            <Switch>
              <Route exact path='/' component={Top} />
              <Route exact path='/login' component={Top} />
              <Route exact path='/:user_id/' component={Home} />
              <Route exact path='/:user_id/home' component={Home} />
              <Route path='/:user_id/:page_id' component={Main} /> 
            </Switch>

          </div>

          <div>
            <footer className="App-footer">
              <h3>Memotube</h3>
              <p>made by "Yokei-na-kotomade"</p>
            </footer>
          </div>
        </Router>

      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
