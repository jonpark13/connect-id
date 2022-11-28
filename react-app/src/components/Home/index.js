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

  return (
    <div> {
        posts.posts.map(e => (
            <HomePost post={e} session={session} fetchData={fetchData}/>
        ))
    } </div>
);
}
export default Home;
