import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
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
    return null;
  }

  return (
    <div className='homePage'> 
      <div className='homeContent'>
        <div className='userContainer'>
          <div className='userContainerTop'>
            <div className='userContainerSemiTop'>

            </div>
          </div>
          <div style={{width: "100%", display: "flex", inlineSize: "200px", wordBreak: "break-all"}}>
            <i className="feedUserIcon fa-regular fa-circle-user" />
          </div>
          <div>
          {
            session.user.first_name
          } {
            session.user.last_name
          }
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
