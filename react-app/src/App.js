import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import * as postActions from './store/post'
import Home from './components/Home';
import Test from './components/TestPage'
import Profile from './components/Profile';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(postActions.getUserPosts())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (!user) {
    return <Redirect path='/login' />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/feed' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/id/:userId' exact={true} >
          <Profile />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Profile />
        </Route>
        <Route path='/test' exact={true} >
          <Test />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
