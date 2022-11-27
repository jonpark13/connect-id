import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Home.css'

function Home() {
  const [posts, setPosts] = useState({posts:[]});
  const [postEdit, setPostEdit] = useState('')
  const { userId }  = useParams();

  const payload = {
    user_id: "test",
    post_body: "test",
    post_id: "test"
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/posts/');
      const responseData = await response.json();
      setPosts(responseData);
    }
    fetchData();
  }, []);

  const handleEditPost = async (id) => {
    let res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
  }

  const handleDeletePost = () => {

  }

  return (
    <div className='homePage'>
        <div className='homeContent' >
            
        </div>
    </div>
  );
}
export default Home;
