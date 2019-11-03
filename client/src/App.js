import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        {/* <div>
          <Switch>
            <Route path="/test" component={Test} />
          </Switch>
        </div> */}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
