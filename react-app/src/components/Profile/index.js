import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { ShuffleContext } from '../../context/shuffle';
import * as postActions from '../../store/post'
import EditUser from '../EditUser';
import PostViewModal from '../PostView';
import UserInfo from '../UserInfo';
import './Profile.css'


function Profile() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { shuffle, timeSince } = useContext( ShuffleContext)
  const session = useSelector((state) => state.session)
  const [userPage, setUserPage] = useState({})
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState({posts:[]});
  const [postEdit, setPostEdit] = useState('')
  const { usertag }  = useParams();

  // console.log(usertag)

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
  let timeDiff
  if(userPage.employment){
    let expList = (userPage.employment).split(",")
    userExperience = expList.map(e => {
      let sub = e.split('.')
      let timeLen = sub[2]
      if(timeLen == "?"){
        return (
          <div className='cardContInd'>
          <div className='cardContTitle' name="educationTitle">
            {sub[0]}
          </div>
          <div className='cardContSub' name="educationDeg">
            {sub[1]}
          </div>
          <div className='cardContDesc' name="educationDur">
            {sub[2]} <i style={{margin:"1px 5px", fontSize:"5px"}}className="fa-solid fa-circle" /> {"?"}
          </div>
        </div>
        )
      }
      else{
        let start = timeLen.split('-')[0].trim('')
        let end = timeLen.split('-')[1].trim('')
        if(timeLen){
          if(start.includes('BCE')) start = -parseInt(start.replace(/\D/g,'')) + 1
          else {
            start = start.replace(/\D/g,'')
            end = sub[2].split(' - ')[1]
          }
          if (end === 'present' || end === 'Present'){
            end = (new Date().getFullYear())
          }
          else {
            if(end.includes('BCE')) console.log(end)
            end = parseInt(sub[2].split(' - ')[1].replace(/\D/g,''))
          }
          timeDiff = Math.abs(start - end)
        }
      }
      return (
        <div className='cardContInd'>
          <div className='cardContTitle' name="experienceTitle">
            {sub[0]}
          </div>
          <div className='cardContSub' name="experienceCompany">
            {sub[1]}
          </div>
          <div className='cardContDesc' name="experienceDur">
            {sub[2]} <i style={{margin:"1px 5px", fontSize:"5px"}}className="fa-solid fa-circle" /> {sub[2] ? (timeDiff + ' years') : "?"}
          </div>
        </div>
        )
    })
  }

  let userEdu
  if(userPage.education){
    let expList = (userPage.education).split(",")
    userEdu = expList.map(e => {
      let sub = e.split('.')
      let timeLen = sub[2]
      if(timeLen == "?"){
        return (
          <div className='cardContInd'>
          <div className='cardContTitle' name="educationTitle">
            {sub[0]}
          </div>
          <div className='cardContSub' name="educationDeg">
            {sub[1]}
          </div>
          <div className='cardContDesc' name="educationDur">
            {sub[2]} <i style={{margin:"1px 5px", fontSize:"5px"}}className="fa-solid fa-circle" /> {"?"}
          </div>
        </div>
        )
      }
      else {
      // console.log(timeLen)
      let start = timeLen.split('-')[0].trim('')
      let end = timeLen.split('-')[1].trim('')
      if(timeLen){
        if(start.includes('BCE')) start = -parseInt(start.replace(/\D/g,'')) + 1
        else {
          start = start.replace(/\D/g,'')
          end = sub[2].split(' - ')[1]
        }
        if (end === 'present' || end === 'Present'){
          end = (new Date().getFullYear())
        }
        else {
          if(end.includes('BCE')) end = -parseInt(end.replace(/\D/g,'')) + 1
          else {
            end = parseInt(sub[2].split(' - ')[1].replace(/\D/g,''))
          }
        }
        timeDiff = Math.abs(start - end)
      }
      return (
        <div className='cardContInd'>
        <div className='cardContTitle' name="educationTitle">
          {sub[0]}
        </div>
        <div className='cardContSub' name="educationDeg">
          {sub[1]}
        </div>
        <div className='cardContDesc' name="educationDur">
          {sub[2]} <i style={{margin:"1px 5px", fontSize:"5px"}}className="fa-solid fa-circle" /> {sub[2] ? (timeDiff + ' years') : "?"}
        </div>
      </div>
      )}
    })
    // userEdu = 
    //   <>
    //     <div className='cardContTitle' name="educationTitle">
    //       {expList[0]}
    //     </div>
    //     <div className='cardContSub' name="educationDeg">
    //       {expList[1]}
    //     </div>
    //     <div className='cardContDesc' name="educationDur">
    //       {expList[2]} <i style={{margin:"1px 5px", fontSize:"5px"}}className="fa-solid fa-circle" /> {expList[3]}
    //     </div>
    //   </>
    
  }

  useEffect(() => {
    fetchData(usertag);
    fetchOthers()
  }, [usertag, session]);

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
              {(!!userPage.profile_image && <img className='userImage' src={userPage.profile_image} onError={e => e.target.src = "https://connectidbucket.s3.amazonaws.com/No_image_available.png"}/>) || <div className='userImageDummy'><i className="fa-regular fa-circle-user" /></div>}
            </div>
            {usertag === session.user.id.toString() && <EditUser user={session.user}/>}
          </div>
          <div className='profInfoContainer'>
            <div className='profInfoName'>
            {userPage.first_name} {userPage.last_name}
            </div>
            <div className='profInfoDesc'>
            {userPage.description || "Please update your description"}
            </div>
            <div className='profInfoLoc'>
            {userPage.location || "Please update your location"}
            </div>
          </div>
        </div>
          <div className='userPageCard'>
            <div className='cardBorder'>
            <div className='cardContType'>Activity</div>
            {!!userPage.activity && (Object.keys(userPage.activity).map(f => {
              // if(f == "likes") return userPage.activity[f].map(e => <div><div>{userPage.first_name} liked this post {e.post_id}</div></div>)
              if(f == "post") return userPage.activity[f].map(e => <div className='activityElementContainer'><div className='activityElementEvent'>{userPage.first_name} created this post</div><div className='activityElementBody'><PostViewModal post={e} time={timeSince(e.created_on)} type={'news'}/></div></div>)
              }))}{!userPage.activity && <div>No recent activity</div>}
            </div>
          </div>
          <div className='userPageCard'>
          <div className='cardBorder'>
            <div className='cardContType'>Experience</div>
            {userExperience || <div style={{fontSize:"14px", color:"grey"}}>Experience has not been updated</div>}
            </div>
          </div>
          <div className='userPageCard'>
          <div className='cardBorder'>
            <div className='cardContType'>Education</div>
            {userEdu  || <div style={{fontSize:"14px", color:"grey"}}>Education has not been updated</div>}
            </div>
          </div>
        </div>
        <div className='sideContainer'>
          <div className='sideContainerTitle'>
          People also viewed
          </div>
            {!!users.users && shuffle(users.users.filter(u => ((u.id.toString() !== usertag.toString()) && u.id.toString() !== session.user.id.toString()))).map(e => <div className='sideContainerItem'><UserInfo user={e} time={null}/></div>).slice(1,7)}
        </div>
      </div>
    </div>
);
}
export default Profile;
