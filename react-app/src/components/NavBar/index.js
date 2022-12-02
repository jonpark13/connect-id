import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import UserOptions from './UserOptions';

const NavBar = () => {
    const location = useLocation()
    const user = useSelector((state) => state.session)

    let userStatus
    if (!user.user) {
        if(location.pathname == '/login') {
            userStatus = (
                <>
                    <div className='navBarLinks joinNow'
                        style={
                            {
                                border: "none",
                                borderRadius: "50px",
                                margin: "10px 10px",
                                width: "90px"
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
                            <div>Join now</div>
                        </NavLink>
                    </div>
                    <div className='navBarLinks signIn'
                        style={
                            {
                                border: "1.5px solid rgb(0,145,164)",
                                borderRadius: "50px",
                                margin: "10px 10px",
                                width: "90px"
                            }
                    }>
                        <NavLink style={
                                {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: 'rgb(0,145,164)',
                                    textDecoration: 'none'
                                }
                            }
                            to='/login'
                            exact={true}
                            activeClassName='active'>
                            <div>Sign in</div>
                        </NavLink>
                    </div>
                </>
            )
        }
        else {
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
                        <i className="fa-solid fa-door-open" /><div>Login</div>
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
                        <i className="fa-solid fa-user-plus" /><div>Sign up</div>
                    </NavLink>
                </div>
            </>
        )}
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
        <div className={(location.pathname == '/login') ? 'navBarContainer': "navBarContainer navBarShadow"}>
            <div className='navBarInner'>
              <div className='navBar leftNav'> {
                !user.user && <div style={{fontSize:'35px', fontWeight:"bolder", marginRight:'5px', color: "rgb(0,145,164)"}}>Connect</div>
              }
              <img style={{height:"35px", width:"35px", objectFit:'cover', float:'left'}} src={'/connectidLogo.png'}/>
              </div>
              <div className='navBar rightNav'>
                {userStatus} 
              </div>
            </div>
        </div>
    );
}

export default NavBar;
