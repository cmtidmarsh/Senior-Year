import LoginPage from './components/login/LoginPage'
import ForgotPassword from './components/login/ForgotPassword'
import ResetPassword from './components/login/ResetPassword'
import ProfileAbout from './components/profile/ProfileAbout'
import ProfileFriends from './components/profile/ProfileFriends'
import ProfilePictures from './components/profile/ProfilePictures'
import Profile from './components/profile/Profile'
import Settings from './components/profile/Settings'
import Messages from './components/feed/Messages'
import Homepage from './components/feed/Homepage'
import Search from './components/feed/Search'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/theme"
import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import React from 'react';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={Homepage} />
          <Route path="/profile/:user" component={Profile} />
          <Route exact path="/profileAbout/:user" component={ProfileAbout} />
          <Route path="/profileFriends" component={ProfileFriends} />
          <Route path="/profilePictures" component={ProfilePictures} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route path="/settings" component={Settings} />
          <Route path="/search" component={Search} />
          <Route path="/messages" component={Messages} />
          <Route path="/resetPassword" component={ResetPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;