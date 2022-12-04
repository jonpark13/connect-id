import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { ShuffleContext } from '../../context/shuffle';
import * as postActions from '../../store/post'
import UserInfo from '../UserInfo';
import './Profile.css'

function Profile() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { shuffle } = useContext( ShuffleContext)
  const session = useSelector((state) => state.session)
  const [userPage, setUserPage] = useState({})
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState({posts:[]});
  const [postEdit, setPostEdit] = useState('')
  const { usertag }  = useParams();

  console.log(usertag)

  let fetchData = async (id) =>  {
    const response = await fetch(`/api/users/${id}`);
    if(!response.ok){
    history.replace('/404')
    }
    const responseData = await response.json();
    setUserPage(responseData);
  }

  let fetchOthers = async () => {
    const response = await fetch('/api/users/');
    const responseData = await response.json();
    setUsers(responseData);
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
    fetchData(usertag);
    fetchOthers()
  }, [usertag]);

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
          <div className='profInfoContainer'>
            <div className='profInfoName'>
            {userPage.first_name} {userPage.last_name}
            </div>
            <div className='profInfoDesc'>
            {userPage.description || "desc goes here"}
            </div>
            <div className='profInfoLoc'>
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
          <div className='sideContainerTitle'>
          People also viewed
          </div>
            {!!users.users && shuffle(users.users.filter(u => u.id != usertag)).map(e => <div className='sideContainerItem'><UserInfo user={e} time={null}/></div>)}
        </div>
      </div>
    </div>
);
}
export default Profile;
