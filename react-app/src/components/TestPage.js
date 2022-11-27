import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import * as postActions from '../store/post'

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

    const payload = {
        user_id: user.user.id,
        post_body: newPost,
        images: ""
    }

    const handleEditPost = async (id) => {
        console.log(id)
    }

    const handleDeletePost = () => {}

    const handleSubmitPost = (e) => {
        e.preventDefault()
        dispatch(postActions.addUserPost(payload))
    }

    return (
        <div> {Object.keys(myPosts).length &&
            Object.values(myPosts).map(e => (
                <div className='postContainer'
                    style={
                        {margin: "20"}
                }>
                    <div>
                        <div>
                            <strong>{
                                e.user_info.first_name
                            }
                                {
                                e.user_info.last_name
                            }</strong>
                        </div>
                        <div>
                            <button onClick={
                                () => {
                                    handleEditPost(e.id)
                                }
                            }>
                                Edit Post
                            </button>
                            <button onClick={
                                () => {
                                    console.log('edit')
                                }
                            }>
                                Delete Post
                            </button>
                        </div>
                    </div>
                    {
                    e.images && <div>
                        <img src={
                                e.images
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
                        e.post_body
                    } </div>
                    {!!e.likes &&
                        <div>{
                            }
                            likes: {
                            e.likes.length
                        } </div>
                    }
                    { !!e.comments && <div> {
                        e.comments.map(com => (
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
