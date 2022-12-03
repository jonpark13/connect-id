import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './UserInfo.css'

function UserInfo({user, time}) {
    
    let userIcon
    if(user.profile_image) {
        userIcon = (
            <div className='userModIcon'>
                <img src={user.profile_image}/>
            </div>
        )
    }
    else{
        userIcon = (
        <div className='userModIcon'>
            <div className='userIcon'><i className="fa-regular fa-circle-user" /></div>
        </div>
        )
    }

    return (
        <div className='userInfoContainer'>
                {userIcon}
            <div className='userInfo'>
            <div className='userName'>
                {user.first_name} {user.last_name}
            </div>
            <div className='userDesc'>
                {user.description}
            </div>
            <div className='userDesc'>
                {time}
            </div>
            </div>
        </div>
    );
}
export default UserInfo;
