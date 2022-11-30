import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import UserOptions from './UserOptions';

const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session)

    let userStatus
    if (! user.user) {
        userStatus = (
            <>
                <div className='navBarLinks'
                    style={
                        {
                            margin: "10px 5px",
                            width: "60px"
                        }
                }>
                    <NavLink style={
                            {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: 'black',
                                textDecoration: 'none'
                            }
                        }
                        to='/login'
                        exact={true}
                        activeClassName='active'>
                        <i className="fa-solid fa-user-group"/><div>Login</div>
                    </NavLink>
                </div>
                <div className='navBarLinks'
                    style={
                        {
                            margin: "10px 5px",
                            width: "60px"
                        }
                }>
                    <NavLink style={
                            {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: 'black',
                                textDecoration: 'none'
                            }
                        }
                        to='/sign-up'
                        exact={true}
                        activeClassName='active'>
                        <i className="fa-regular fa-message"/><div>Sign up</div>
                    </NavLink>
                </div>
            </>
        )
    } else {
        userStatus = (
            <>
                <NavLink className='navBarLinks' to='/feed'
                    exact={true}
                    activeClassName='navBarLinks navActive'>
                    
                        <i className="fa-solid fa-house-chimney"/><div style={
                            {
                                marginTop: "5px",
                                fontSize: "12px"
                            }
                        }>Home</div>
            
                </NavLink>
                <NavLink className='navBarLinks' to='/login'
                    exact={true}
                    activeClassName='navBarLinks navActive'>
                        <i className="fa-solid fa-user-group"/><div style={
                            {
                                marginTop: "5px",
                                fontSize: "12px"
                            }
                        }>Login</div>
                </NavLink>
                <NavLink className='navBarLinks' to='/sign-up'
                    exact={true}
                    activeClassName='navBarLinks navActive'>
                    
                        <i className="fa-regular fa-message"/><div style={
                            {
                                marginTop: "5px",
                                fontSize: "12px"
                            }
                        }>Sign up</div>
            
                </NavLink>
                <NavLink className='navBarLinks' to='/test'
                    exact={true}
                    activeClassName='navBarLinks navActive'>
                    
                        <i className="fa-solid fa-house-chimney"/><div style={
                            {
                                marginTop: "5px",
                                fontSize: "12px"
                            }
                        }>Test</div>
            
                </NavLink>
                <UserOptions user={
                    user.user
                }/>

            </>
        )
    }
    return (
        <div className='navBarContainer'>
            <div className='navBarInner'>
              <div className='navBar leftNav'>
              <img style={{height:"40px", width:"40px", objectFit:'cover', float:'left'}} src='./connectidLogo.png'/>
              </div>
              <div className='navBar rightNav'>
                {userStatus} 
              </div>
            </div>
        </div>
    );
}

export default NavBar;
