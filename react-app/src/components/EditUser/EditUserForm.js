import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import * as userActions from '../../store/session'
import Gallery from '../Gallery';
import './EditUserForm.css'

function EditUserForm({type, showModal, setShowModal, postInfo, fetchData}) {
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

    const editUserFunc = async () => {
        let payload = {
            description: 'test2',
            education: 'test2.teest2.1 - Present',
            location: 'test2,test',
            employment: 'test2.teest2.1 - Present',
            profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s'
        }
        let postres = await dispatch(userActions.update(payload, user.user.id))
        if(postres && postres.ok === false){
            let data = postres.json()
            console.log(data)
        }
        else{
            console.log(postres)
        }
    }

    // const handleEdit = async (e) => {
    //     e.preventDefault()
    //     let payload = {
    //         user_id: postInfo.user_info.id,
    //         post_body: postBody,
    //         images: postInfo.images
    //     }
    //     let images = document.querySelector(".imagesInput")
    //     let formData
    //     console.log(images.files.length)
    //     if (images.files.length) {
    //         formData = new FormData();
    //         for (const img of images.files) {
    //             formData.append("image", img);
    //         }
    //         setImageLoading(true);
    //         const res = await fetch('/api/posts/images', {
    //           method: "POST",
    //           body: formData,
    //       });
    
    //       if (res.ok) {
    //         let data = await res.json();
    //         console.log(data, "PICTURRE DAATA")
    //         const dataToArr = (data.images.replace(/[\[\]']+/g,'')).split(', ')
    //         payload.images = (payload.images.concat(dataToArr)).filter(e => e)
            
    //         editPostFunc(payload, postInfo.id)
    //         }
    //         else {
    //             let data = await res.json()
    //             setImageLoading(false);
    //             console.log(data)
    //             setErrors(data)
    //         }
    //       }
    //       else {
    //           editPostFunc(payload, postInfo.id)
    //       }
    //   }


    return (
        <>
        <div className='postFormHeader'>
            <div style={{fontSize:"18px"}}>test</div>
        </div>
        {/* <div className='postFormBody'>
            <form onSubmit={editUserFunc}>
            <input
                className='inputBar'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
            />
            </form>
            <form onSubmit={editUserFunc}>
            <input
                className='inputBar'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
            />
            </form>
            <form onSubmit={editUserFunc}>
            <input
                className='inputBar'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
            />
            </form>
            <form onSubmit={editUserFunc}>
            <input
                className='inputBar'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
            />
            </form>
            <form onSubmit={editUserFunc}>
            <input
                className='inputBar'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                style={errors.email ? {border:"rgb(200, 0, 0) 1px solid", caretColor:"black", outline:"rgb(200, 0, 0) 1px solid"} : {color:"black"}}
            />
            </form>
        </div> */}
        <button onClick={editUserFunc} >TEST</button>
        </>
    );
}
export default EditUserForm;
