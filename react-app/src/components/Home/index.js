import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom';
import HomePost from './HomePost'
import './Home.css'
import CreatePost from '../CreatePost';

function Home() {
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const userPosts = useSelector((state) => state.post)
  const [posts, setPosts] = useState({posts:[]});
  const [postEdit, setPostEdit] = useState('')
  const { userId }  = useParams();

  let fetchData = async () =>  {
    const response = await fetch('/api/posts/');
    const responseData = await response.json();
    setPosts(responseData);
  }

  useEffect(() => {
    fetchData();
  }, [userPosts]);

  if (!session.user) {
    return <Redirect to={'/login'} />;
  }

  return (
    <div className='homePage'> 
      <div className='homeContent'>
        <div className='homeSideContainer'>
        <div className='userContainer'>
          <div className='userContainerTop'>
            <div className='userContainerSemiTop'>

            </div>
          </div>
          <div style={{width: "100%", display: "flex", inlineSize: "200px", wordBreak: "break-all"}}>
            <i className="feedUserIcon fa-regular fa-circle-user" />
          </div>
          <div style={{fontSize:"1.1rem", margin:"5px 0px"}}>
          {
            session.user.first_name
          } {
            session.user.last_name
          }
          </div>
          <div style={{fontSize:"1rem", color:"grey", margin:"5px 0px"}}>
            {session.user.description}
          </div>
        </div>
        <div className='aboutContainer'>
          <div style={{ fontSize:"1.2rem",fontWeight:"bold", marginTop:"10px"}}>Meet the dev!</div>
          <div style={{ fontSize:"1 rem", marginTop:"10px"}}>
            Jon Park
          </div>
          <div style={{ fontSize:"0.8rem", marginTop:"10px"}}>about</div>
          <div style={{ fontSize:"2rem", marginTop:"10px"}}>
            <a href="https://github.com/jonpark13" target="_blank" >
                <i className="abtIco fa-brands fa-github"></i>
            </a>
          </div>
          <div  style={{ fontSize:"2rem", marginTop:"10px"}}>
            <a href="https://www.linkedin.com/in/jon-park-9b23b6142/" target="_blank" >
                <i className="abtIco fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
        </div>
        <div className='postsContainer'>
          <div className='postsCreator'>
            <div className='postsCreatorUpper'>
            <CreatePost />
            </div>
            <div className='postsCreatorLower'>

            </div>
          </div>
        {
            posts.posts.map(e => (
                <HomePost post={e} session={session} fetchData={fetchData}/>
            )).reverse()
        }
        </div>
        <div className='newContainer'>
            news
        </div>
      </div>
    </div>
);
}
export default Home;
