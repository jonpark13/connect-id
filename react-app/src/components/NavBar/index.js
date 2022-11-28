
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  return (
    <div>
      <div className='navBar' style={{display:"flex", flexDirection:"reverse-row", justifyContent: 'center'}}>
        <div className='navBarLinks' style={{margin:"10px 5px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/' exact={true} activeClassName='active'>
            <i className="fa-solid fa-house-chimney" /><div>Home</div>
          </NavLink>
        </div>
        <div className='navBarLinks' style={{margin:"10px 5px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/login' exact={true} activeClassName='active'>
            <i className="fa-solid fa-user-group" /><div>Login</div>
          </NavLink>
        </div>
        <div className='navBarLinks' style={{margin:"10px 5px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/sign-up' exact={true} activeClassName='active'>
          <i className="fa-regular fa-message" /><div>Sign up</div>
          </NavLink>
        </div>
        <div className='navBarLinks' style={{margin:"10px 5px"}}>
          <NavLink style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}} to='/test' exact={true} activeClassName='active'>
          <i className="fa-solid fa-house-chimney" /><div>Test</div>
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
