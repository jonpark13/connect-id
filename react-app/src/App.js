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
import EditUserForm from './components/EditUser/EditUserForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      if(user.user) await dispatch(postActions.getUserPosts())
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
        <ProtectedRoute path='/feed' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/id/:usertag/' exact={true} >
          <Profile />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Redirect to={'/feed'}/>
        </Route>
        <Route path='/test' exact={true} >
          <EditUserForm />
        </Route>
        <Route path="*">
          <div style={{ fontSize: 200, marginTop: "150px",textAlign:"center" }}>* 404: Page not found *</div>
        </Route>
        <Route path="/404" exact={true}>
          <div style={{ fontSize: 200, marginTop: "150px",textAlign:"center" }}>* 404: Page not found *</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
