import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Home } from './Components/Home';
import { userAuthenticationStatusContainer } from './services/user-status';

const App = () => {

  const { isAuthenticated, userName, LogOut } = userAuthenticationStatusContainer();

  useEffect(() => {
  }, []) // empty array indicates that it is executed once

  return (
    <BrowserRouter>
      <div className="App container">

        <div className="row">

          <div className="col-sm">
            <h5 className='d-flex justify-content-center m-2'>
              Welcome in "E-mail Viewer"
            </h5>
          </div>

          <div className="col-sm">
            <h5 className='d-flex justify-content-center m-2'>
              Current user: {isAuthenticated ? userName : 'no-one'}
            </h5>
          </div>

          {isAuthenticated ?
            <div className="col-sm-2">
              <button type="button" className='btn btn-primary m-2' onClick={LogOut}>
                LogOut
              </button>
            </div>
            : null}

        </div>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
        </Routes>

      </div>
    </BrowserRouter>
  );

}

export default App;
