import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './UserInfo.css'

function UserInfo({user, time}) {
    const history = useHistory()

    const profilePage = () => {
        history.push(`/id/${user.id}`)
    }
    
    let userIcon
    if(user.profile_image) {
        userIcon = (
            <div className='userModIcon' onClick={profilePage}>
                <img className='userModProfileImage' src={user.profile_image} onError={e => e.target.src = "https://connectidbucket.s3.amazonaws.com/No_image_available.png"}/>
            </div>
        )
    }
    else{
        userIcon = (
        <div className='userModIcon'  onClick={profilePage}>
            <div className='userIcon'><i className="fa-regular fa-circle-user" /></div>
        </div>
        )
    }

    return (
        <div className='userInfoContainer'>
                {userIcon}
            <div className='userInfo'>
            <div className='userName'  onClick={profilePage}>
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
