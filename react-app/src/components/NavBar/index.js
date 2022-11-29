
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import UserOptions from './UserOptions';

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session)

  let userStatus
  if(!user.user) {
    userStatus = (<><div className='navBarLinks' style={{margin:"10px 5px", width:"60px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/login' exact={true} activeClassName='active'>
            <i className="fa-solid fa-user-group" /><div>Login</div>
          </NavLink>
        </div>
        <div className='navBarLinks' style={{margin:"10px 5px", width:"60px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/sign-up' exact={true} activeClassName='active'>
          <i className="fa-regular fa-message" /><div>Sign up</div>
          </NavLink>
        </div></>)
  }
  else {
    userStatus = (<>
      <div className='navBarLinks' style={{margin:"10px 5px", width:"60px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/feed' exact={true} activeClassName='active'>
            <i className="fa-solid fa-house-chimney" /><div>Home</div>
          </NavLink>
        </div>
        <div className='navBarLinks' style={{margin:"10px 5px", width:"60px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/login' exact={true} activeClassName='active'>
            <i className="fa-solid fa-user-group" /><div>Login</div>
          </NavLink>
        </div>
        <div className='navBarLinks' style={{margin:"10px 5px", width:"60px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/sign-up' exact={true} activeClassName='active'>
          <i className="fa-regular fa-message" /><div>Sign up</div>
          </NavLink>
        </div>
        <div className='navBarLinks' style={{margin:"10px 5px", width:"60px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/test' exact={true} activeClassName='active'>
          <i className="fa-solid fa-house-chimney" /><div>Test</div>
          </NavLink>
        </div>
        <UserOptions user={user.user} />

    </>)
  }
  return (
    <div className='navBarContainer'>
      <div className='navBar'>
        {userStatus}
      </div>
    </div>
  );
}

export default NavBar;
