import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import * as postActions from '../store/post'
import EditPostModal from './ModalTest';

function Home() {
    const dispatch = useDispatch()
    const myPosts = useSelector((state) => state.post)
    const user = useSelector((state) => state.session)
    const [posts, setPosts] = useState({});
    const [postEdit, setPostEdit] = useState('')
    const [newPost, setNewPost] = useState('')
    const {userId} = useParams();

    useEffect(() => {
        dispatch(postActions.getUserPosts())
    }, []);

    let payload = {
        user_id: user.user.id,
        post_body: newPost,
        images: ""
    }

    const handleDeletePost = (e, id) => {
        e.preventDefault()
        dispatch(postActions.deleteUserPost(id))
    }

    const handleSubmitPost = (e) => {
        e.preventDefault()
        dispatch(postActions.addUserPost(payload))
    }

    return (
        <div> {Object.keys(myPosts).length &&
            Object.values(myPosts).map(post => (
                <div className='postContainer'
                    style={
                        {margin: "20"}
                }>
                    <div>
                        <div>
                            <strong>{
                                post.user_info.first_name
                            }
                                {
                                post.user_info.last_name
                            }</strong>
                        </div>
                        <div>
                            <EditPostModal postInfo={post}/>
                            <button onClick={
                                (e) => {
                                    handleDeletePost(e, post.id)
                                }
                            }>
                                Delete Post
                            </button>
                        </div>
                    </div>
                    {
                    post.images && <div>
                        <img src={
                                post.images
                            }
                            style={
                                {
                                    height: "120px",
                                    width: "120px",
                                    objectFit: "cover"
                                }
                            }/>
                    </div>
                }
                    <div> {
                        post.post_body
                    } </div>
                    {!!post.likes &&
                        <div>{
                            }
                            likes: {
                            post.likes.length
                        } </div>
                    }
                    { !!post.comments && <div> {
                        post.comments.map(com => (
                            <div> {
                                com.comment
                            } </div>
                        ))
                    } </div>}
                </div>
            ))
        } 
            <form onSubmit={handleSubmitPost}>
                <textarea placeholder='What!!' value={newPost} onChange={(e) => {setNewPost(e.target.value);console.log(newPost)}} />
                <button type='submit'>
                    Add Post
                </button>
            </form>
        </div>
    );
}
export default Home;
