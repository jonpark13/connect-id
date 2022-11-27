import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
        {
            posts.posts.map(e => (
                <div className='postContainer' style={{margin: "20"}}>
                    <div>
                        <div>
                            <strong>{e.user_info.first_name} {e.user_info.last_name}</strong>
                        </div>
                        <div>
                            <button onClick={() => {console.log('edit')}}>
                                Edit Post
                            </button>
                            <button onClick={() => {console.log('edit')}}>
                                Delete Post
                            </button>
                        </div>
                    </div>
                    { e.images &&
                        <div>
                            <img src={e.images} style={{height: "120px", width: "120px", objectFit: "cover"}}/>
                        </div>
                    }
                    <div>
                        {e.post_body}
                    </div>
                    <div>
                        likes: {e.likes.length}
                    </div>
                    <div>
                        {e.comments.map(com => (
                            <div>
                                {com.comment}
                            </div>
                        ))}
                    </div>
                </div>
            ))
        }
    </div>
  );
}
export default Home;
