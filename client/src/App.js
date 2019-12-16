import React, { UseContext } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Students/Home';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import UserContext from './Contexts/UserContext';
import { PromiseProvider } from 'mongoose';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <UserContext.Provider value={"hello"}>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
            </Switch> 
        </UserContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
