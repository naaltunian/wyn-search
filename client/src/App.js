import React, { useContext, useReducer, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import reducer from './reducer';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile/Profile';
import Home from './Components/Students/Home';
import Student from './Components/Student/Student'
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import UserContext from './Contexts/UserContext';

const App = (props) => {
  const initialState = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  // keeps userContext authorized if signed in
  useEffect(_ => {
    if (localStorage.getItem("token") != null) {
      dispatch({type: "LOGIN"});
    }
  }, [initialState.isAuth]);

  return (
    <BrowserRouter>
      <>
        <UserContext.Provider value={{ state, dispatch }}>
          <Navbar isAuth={state.isAuth} client={props.client} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user/:id" component={Student}/>
              <Route path="/signup" component={SignUp} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
            </Switch>
        </UserContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
