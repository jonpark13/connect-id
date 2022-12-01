import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './auth.css'

const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='loginPage'>
      <div className='loginContent'>
      <div className='loginFormContainer'>
        <div style={{position:"relative",left:"90px", top:"-40px",fontSize:"55px", width:"600px", color:"rgb(187 102 9)"}}>Welcome to your historical community</div>
    <form className='loginFormContainer' onSubmit={onLogin}>
      {/* <div>
        {JSON.stringify(errors)}
      </div> */}
      <div for="emailInput" className='inputFloatField'
      style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
      >
        <input
          id="emailInput"
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
        <label className='inputText' htmlFor='email'>Email</label>
      </div>
      {<div className='errorMsgText'>{errors.email}</div>}
      <div className='inputFloatField'
      style={(errors.password || errors.email == "Email address or password is incorrect.") ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
      >
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <label className='inputText' htmlFor='password'>Password</label>
      </div>
      {<div className='errorMsgText'>{errors.password}</div>}
      <button className='loginButton' type='submit'>Login</button>
    </form>
    <button className='signupRedirectButton' onClick={() => history.push('/sign-up')}>New to Connectĭd? Join now</button>
    <div style={{display:"flex", alignItems:"center",flexDirection:"row", width: "100%"}}><hr className='borderLine'/>or<hr className='borderLine'/></div>
    <button className='loginButton' onClick={demoLogin}>Demo</button>
    </div>
    <div><img src='https://connectidbucket.s3.amazonaws.com/connectidSplash.png'/></div>
    </div>
    </div>
    </>
  );
};

export default LoginForm;
