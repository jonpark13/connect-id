import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else {
      setErrors(prev => { return {...prev, password:"Passwords do not match"}})
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='authPage'>
      <div style={{fontSize:'32px'}}> Make the most of your professional life</div>
      <div className='authContent'>
        <div className='formContainer' >
    <form className='formContainer' onSubmit={onSignUp}>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div className='inputField'>
        <label  className='inputText'>First Name</label>
        <input
          className='inputBar'
          type='text'
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          style={errors.first_name ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
        ></input>
      </div>
      {<div className='errorMsgText'>{errors.first_name}</div>}
      <div className='inputField'>
        <label className='inputText'>Last Name</label>
        <input
          className='inputBar'
          type='text'
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          style={errors.last_name ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
        ></input>
      </div>
      {<div className='errorMsgText'>{errors.last_name}</div>}
      <div className='inputField'>
        <label className='inputText'>Email</label>
        <input
          className='inputBar'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
        ></input>
      </div>
      {<div className='errorMsgText'>{errors.email}</div>}
      <div className='inputField'>
        <label className='inputText'>Password (5 or more characters)</label>
        <input
          className='inputBar'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          style={errors.password ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
        ></input>
      </div>
      {<div className='errorMsgText'>{errors.password}</div>}
      <div className='inputField'>
        <label className='inputText'>Repeat Password (5 or more characters)</label>
        <input
          className='inputBar'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          style={errors.password ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
        ></input>
      </div>
      {<div className='errorMsgText'>{errors.password}</div>}
      <button className='formSubmit' type='submit'>Agree and join</button>
    </form>
    <div style={{display:"flex", flexDirection:"row", width: "90%"}}><hr className='borderLine'/>or<hr className='borderLine'/></div>
    <button className='formSubmit' style={{margin:"45px 0px"}} onClick={demoLogin}>Continue as Demo</button>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;
