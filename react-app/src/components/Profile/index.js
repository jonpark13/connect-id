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

  let userExperience
  if(userPage.employment){
    let expList = (userPage.employment).split(".")
    userExperience =  
      <>
        <div className='cardContTitle' name="experienceTitle">
          {expList[0]}
        </div>
        <div className='cardContSub' name="experienceCompany">
          {expList[1]}
        </div>
        <div className='cardContDesc' name="experienceDur">
          {expList[2]} <i style={{margin:"1px 5px", fontSize:"5px"}}className="fa-solid fa-circle" /> {expList[3]}
        </div>
      </>
    
  }

  let userEdu
  if(userPage.education){
    let expList = (userPage.education).split(".")
    userEdu =  
      <>
        <div className='cardContTitle' name="educationTitle">
          {expList[0]}
        </div>
        <div className='cardContSub' name="educationDeg">
          {expList[1]}
        </div>
        <div className='cardContDesc' name="educationDur">
          {expList[2]} <i style={{margin:"1px 5px", fontSize:"5px"}}className="fa-solid fa-circle" /> {expList[3]}
        </div>
      </>
    
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
              {userPage.profile_image || <div className='userImageDummy'><i className="fa-regular fa-circle-user" /></div>}
            </div>
          </div>
          <div className='userInfoContainer'>
            <div className='userInfoName'>
            {userPage.first_name} {userPage.last_name}
            </div>
            <div className='userInfoDesc'>
            {userPage.description || "desc goes here"}
            </div>
            <div className='userInfoLoc'>
            {userPage.location || "location goes here"}
            </div>
          </div>
          <div style={{width: "100%", display: "flex", wordBreak: "break-all"}}>
          </div>
        </div>
          <div className='userPageCard'>
            <div className='cardBorder'>
            <div className='cardContType'>Activity</div>
            </div>
          </div>
          <div className='userPageCard'>
          <div className='cardBorder'>
            <div className='cardContType'>Experience</div>
            {userExperience}
            </div>
          </div>
          <div className='userPageCard'>
          <div className='cardBorder'>
            <div className='cardContType'>Education</div>
            {userEdu}
            </div>
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
