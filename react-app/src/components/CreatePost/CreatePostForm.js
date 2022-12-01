import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import * as postActions from '../../store/post'
import './CreatePostForm.css'

function CreatePostForm({showModal, setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const myPosts = useSelector((state) => state.post)
    const user = useSelector((state) => state.session)
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let images = document.querySelector(".imagesInput")
        let formData
        console.log(images.files.length)
        if (images.files.length) {
            console.log(images.files)
            formData = new FormData();
            for (const img of images.files) {
                formData.append("image", img);
            }
        }
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/posts/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            let data = await res.json();
            payload.images = data.images
            dispatch(postActions.addUserPost(payload))
            setImageLoading(false);
            
        }
        else {
            setImageLoading(false);
            console.log("error");
        }
        document.body.style.overflow = 'scroll'
        setShowModal(false)
    }

    return (
        <>
        <div className='postFormHeader'>
            <div style={{fontSize:"18px"}}>Create Post</div>
        </div>
        <div className='postFormBody'>
            <form onSubmit={handleSubmit}>
                <textarea className="postText" placeholder='What do you want to talk about?' value={newPost} onChange={(e) => {setNewPost(e.target.value);console.log(newPost)}} />
                {}
                <div className='postBottom'>
                    <label className='postBottomLabel'>
                    <div className='circleBackground'>
                    <i className="fa-regular fa-image" style={{fontSize:"30px"}}/>
                    </div>
                    <input
                    className='imagesInput'
                    type="file"
                    multiple
                    accept="image/*"
                    // style={{display:"none"}}
                    />
                </label>
                <button className="createPostButton" disabled={!newPost.length} type='submit'>
                    Post
                </button>
                </div>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
        </>
    );
}
export default CreatePostForm;
