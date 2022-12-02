import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom';
import * as postActions from '../../store/post'
import './Profile.css'

function Profile() {
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const [userPage, setUserPage] = useState({})
  const [posts, setPosts] = useState({posts:[]});
  const [postEdit, setPostEdit] = useState('')
  const { usertag }  = useParams();

  let fetchData = async () =>  {
    const response = await fetch(`/api/users/${usertag}`);
    const responseData = await response.json();

    setUserPage(responseData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!session.user) {
    return <Redirect to={'/login'} />
  }

  return (
    <div className='profPage'> 
      <div className='profContent'>
        <div className='userPageContainer'>
        <div className='userPageInfoCard'>
          <div className='userPageContainerTop'>
            <div className='userPageContainerSemiTop'>
              imgCont
            </div>
          </div>
          <div className='userInfoContainer'>
            <div className='userInfoName'>
            {userPage.first_name} {userPage.last_name}
            </div>
            <div className='userInfoDesc'>
            desc{userPage.descripition}
            </div>
            <div className='userInfoLoc'>
            loc{userPage.location}
            </div>
          </div>
          <div style={{width: "100%", display: "flex", wordBreak: "break-all"}}>
          {
            JSON.stringify(userPage)
          }
          </div>
        </div>
          <div className='userPageCard'>
            test
          </div>
          <div className='userPageCard'>
            Experience
          </div>
          <div className='userPageCard'>
            Education
          </div>
        </div>
        <div className='sideContainer'>
          People also viewed
        </div>
      </div>
    </div>
);
}
export default Profile;
