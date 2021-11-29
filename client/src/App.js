import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './component/SignIn/SignIn';
import SignUp from './component/SignUp/SignUp';
import LoadingPage from "./component/LoadingPage/LoadingPage";
import HomeUser from "./component/HomeUser/HomeUser";
import Home from './component/Home/Home';
import Profile from "./component/Profile/Profile";
import NotFoundPage from "./component/NotFoundPage/NotFoundPage";


function Loading(props) {



  if (props.login === undefined) {
    return <LoadingPage />
  }else if (props.login === true){
    return <HomeUser logout={props.logout} errorServer={props.errorServer}/>
  }else{
    return <Home/>
  }
}

function App() {

  const [login, setlogin] = useState();
  const [errorToken, setErrorToken] = useState(false);
 
  
  const logout = () => {
    localStorage.removeItem('accessToken');
    setlogin(false);
  }

  const error = () => {
    setErrorToken(true);
  }

  const whenLogin = (n) => {
    setlogin(n);
  }


  useLayoutEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setlogin(true);
    } else {
      setlogin(false)
    }

  },[login]);


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {errorToken ? <LoadingPage errorToken={errorToken} /> : 
            <Loading logout={logout} errorServer={error} login={login} />}
          </Route>
          <Route path="/SignIn">
            <SignIn whenLogin={whenLogin} />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route >
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );

}

export default App;

