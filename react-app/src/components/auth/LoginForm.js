import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './auth.css'

const LoginForm = () => {
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
    <div className='authPage'>
      <div className='authContent'>
      <div className='formContainer'>
    <form className='formContainer' onSubmit={onLogin}>
      {/* <div>
        {JSON.stringify(errors)}
      </div> */}
      <div  className='inputField'>
        <label className='inputText' htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
          onChange={updateEmail}
        />
      </div>
      {<div className='errorMsgText'>{errors.email}</div>}
      <div className='inputField'>
        <label className='inputText' htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          style={(errors.password || errors.email == "Email address or password is incorrect.") ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
          onChange={updatePassword}
        />
      </div>
      {<div className='errorMsgText'>{errors.password}</div>}
      <button type='submit'>Login</button>
    </form>
    <button onClick={demoLogin}>Demo</button>
    </div>
    </div>
    </div>
    </>
  );
};

export default LoginForm;
