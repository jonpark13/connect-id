import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as postActions from '../../store/post'
import HomePost from './HomePost'
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
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
  }, []);

  if (!session.user) {
    return null;
  }

  return (
    <div className='homePage'> 
      <div className='homeContent'>
        <div className='userContainer'>
          <div className='userContainerTop'>
            <div className='userContainerSemiTop'></div>
          {
            session.user.first_name
          } {
            session.user.last_name
          }
          </div>
          <div style={{width: "100%", display: "flex", inlineSize: "200px", wordBreak: "break-all"}}>
          {
            JSON.stringify(session.user)
          }
          </div>
        </div>
        <div className='postsContainer'>
          <div className='postsCreator'>
            <div className='postsCreatorUpper'>
              user img
            <button className='postsCreatorButton'>Start a post</button>
            </div>
            <div className='postsCreatorLower'>

            </div>
          </div>
        {
            posts.posts.map(e => (
                <HomePost post={e} session={session} fetchData={fetchData}/>
            ))
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
