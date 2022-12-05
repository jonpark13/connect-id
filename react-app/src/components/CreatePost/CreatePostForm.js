import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import * as postActions from '../../store/post'
import Gallery from '../Gallery';
import './CreatePostForm.css'

function CreatePostForm({type, showModal, setShowModal, postInfo, fetchData}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const myPosts = useSelector((state) => state.post)
    const user = useSelector((state) => state.session)
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [posts, setPosts] = useState({});
    const [postEdit, setPostEdit] = useState('')
    const [newPost, setNewPost] = useState('')
    const [postBody, setPostBody] = useState(type == "edit" ? postInfo.post_body : null)
    const [postImages, setPostImages] = useState(type == "edit" ? postInfo.images : [])
    const [imgPrev, setImgPrev] = useState([])
    const [errors, setErrors] = useState({})
    const [imgErr, setImgErr] = useState(false)
    const {userId} = useParams();

    const editPostFunc = async (pl, id) => {
        let postres = await dispatch(postActions.editUserPost(pl, id))
        if(postres && postres.ok === false){
            let data = postres.json()
            await data.then(e => setErrors(e))
        }
        else{
            // document.body.style.overflow = 'scroll'
            fetchData()
            setShowModal(false)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        let payload = {
            user_id: postInfo.user_info.id,
            post_body: postBody,
            images: postInfo.images
        }
        let images = document.querySelector(".imagesInput")
        let formData
        console.log(images.files.length)
        if (images.files.length) {
            formData = new FormData();
            for (const img of images.files) {
                formData.append("image", img);
            }
            setImageLoading(true);
            const res = await fetch('/api/posts/images', {
              method: "POST",
              body: formData,
          });
    
          if (res.ok) {
            let data = await res.json();
            console.log(data, "PICTURRE DAATA")
            const dataToArr = (data.images.replace(/[\[\]']+/g,'')).split(', ')
            payload.images = (payload.images.concat(dataToArr)).filter(e => e)
            
            editPostFunc(payload, postInfo.id)
            }
            else {
                let data = await res.json()
                setImageLoading(false);
                console.log(data)
                setErrors(data)
            }
          }
          else {
              editPostFunc(payload, postInfo.id)
          }
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
            user_id: user.user.id,
            post_body: newPost,
            images: ""
        }
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
            let postres = await dispatch(postActions.addUserPost(payload))
            if(postres){
                setErrors(postres)
            }
            else{
                // document.body.style.overflow = 'scroll'
                setShowModal(false)
            }
            setImageLoading(false);
            
        }
        else {
            setImageLoading(false);
            let data = await res.json();
            setErrors(data)
        }
    }

    const imgPreviews = (e) => {
        let images = e.target
        if (images && images.files.length) {
            setImgPrev(Array.from(images.files))
            console.log(imgPrev, "imgprev")
        }
        else {
            setImgPrev([])
        }
    }

    const postImgErrHandler = (e) => {
        let files = Array.from(e.target.files)
        if(files.length > 0){
            for(let i = 0; i < files.length; i++){
                if(files[i].type.startsWith('image/')){
                    console.log('is image')
                }
                else {
                    console.log('is not image')
                     return setImgErr(true)
                }
            }
            return setImgErr(false)
        }
        else {
            return setImgErr(false)
        }
    }

    let headerTitle
    let submitText
    let postText
    let submitType
    let setPostText
    if(type == 'edit') {
        headerTitle = "Edit Post"
        submitText = "Save"
        postText = postBody
        setPostText = setPostBody
        submitType = handleEdit
    } else if (type == 'create') {
        headerTitle = "Create Post"
        submitText = "Post"
        postText = newPost
        setPostText = setNewPost
        submitType = handleSubmit
    }

    return (
        <>
        <div className='postFormHeader'>
            <div style={{fontSize:"18px"}}>{headerTitle}</div>
        </div>
        <div className='postFormBody'>
            <form onSubmit={submitType}>
                <textarea className="postText" placeholder='What do you want to talk about?' value={postText} onChange={(e) => {setPostText(e.target.value)}} />
                <div className="errorMsgText">{!!errors.post_body && errors.post_body + '. '}{!!errors.errors && errors.errors + '. '}{(postText.length > 500) && (` ${postText.length}/500`)}</div>
                {/* <div className='imgPrev'>
                    {imgPrev.map(file => (
                    <img src={URL.createObjectURL(file)}/>
                    ))}
                </div> */}
                {(!!imgPrev.length || (postImages[0] != "" && !!postImages.length)) && <Gallery list={imgPrev} prevList={postImages} height={"400px"} width={"500px"}/>}
                <div className='postBottom'>
                    <label className='postBottomLabel'>
                    <div className='circleBackground'>
                    <i className="fa-regular fa-image" style={{fontSize:"30px"}}/>
                    </div>
                    <input
                    onChange={(e) => {imgPreviews(e);postImgErrHandler(e)}}
                    id='imagesInput'
                    className='imagesInput'
                    type="file"
                    multiple
                    accept="image/*"
                    // style={{display:"none"}}
                    />
                </label>
                <button className={(!postText.length || imgErr ) ? "createPostButtonDisabled" : "createPostButton"} disabled={!postText.length || imgErr} type='submit'>
                    {submitText}
                </button>
                </div>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
        </>
    );
}
export default CreatePostForm;
