import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState({posts:[]});
  const { userId }  = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/posts/');
      const responseData = await response.json();
      setPosts(responseData);
    }
    fetchData();
  }, []);

  return (
    <div>
        {
            posts.posts.map(e => (
                <div className='postContainer' style={{margin: "20"}}>
                    <div>
                        <div>
                            <strong>{e.user_info.first_name} {e.user_info.last_name}</strong>
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
