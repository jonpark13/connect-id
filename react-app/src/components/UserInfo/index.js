import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './UserInfo.css'

function UserInfo({user}) {

    return (
        <div>
            {JSON.stringify(user)}
        <div>
            {user.first_name} {user.last_name}
        </div>
        </div>
    );
}
export default UserInfo;
