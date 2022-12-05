import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import * as userActions from '../../store/session'
import './EditUserForm.css'

function EditUserForm({setShowModal, user, type}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector((state) => state.session)
    const [imageLoading, setImageLoading] = useState(false);
    const [description, setDescription] = useState(session.user.description)
    const [education, setEducation] = useState('')
    const [employment, setEmployment] = useState(session.user.employment)
    const [location, setLocation] = useState(session.user.location)
    const [profImage, setProfImage] = useState(session.user.profile_image)
    const [postImages, setPostImages] = useState([])
    const [imgPrev, setImgPrev] = useState(session.user.profile_image || "https://connectidbucket.s3.amazonaws.com/No_image_available.png")
    const [errors, setErrors] = useState({})
    const [imgErr, setImgErr] = useState(false)

    // const listToDict = (list) => {
    //     let allObj = []
    //     const listing = list.trim().split(',')
    //     listing.forEach( (e,i) => {
    //         let newObj = {}
    //         newObj.main = e.split('.')[0]
    //         newObj.sub = e.split('.')[1]
    //         newObj.startDate = e.split('.')[2].split('-')[0].trim()
    //         newObj.endDate = e.split('.')[2].split('-')[1].trim()
    //         allObj.push(newObj)
    //     })
    //     console.log(allObj, "RAN")
    //     return allObj
    // }

    // const [eduList, setEduList] = useState(listToDict(session.user.education))

    const editUserFunc = async (e) => {
        e.preventDefault()
        let payload = {
            profile_image: profImage,
            description: description,
            location: location,
        }
        let images = document.querySelector(".imagesInput")
        let formData
        console.log(images.files.length)
        if (!!images.files.length) {
            formData = new FormData();
            for (const img of images.files) {
                formData.append("image", img);
            }
            setImageLoading(true);
            const res = await fetch('/api/users/images', {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                let data = await res.json();
                console.log(data, "PICTURRE DAATA")
                payload.profile_image = data.image
                let postres = await dispatch(userActions.update(payload, session.user.id))
                console.log(postres)
                if (postres) {
                    setErrors(postres)
                } else {
                    setErrors('')
                    setShowModal(false)
                }
            }
            else {
                let data = await res.json()
                setImageLoading(false);
                console.log(data)
                setErrors(data)
            }
        }
        else {
            let postres = await dispatch(userActions.update(payload, session.user.id))
            console.log(postres)
            if (postres) {
                setErrors(postres)
            } else {
                setErrors('')
                setShowModal(false)
            }
        }
    }

    const imgPreviews = (e) => {
        let images = e.target
        console.log(images, images.files.length, "image")
        if (images && images.files.length) {
            setImgPrev(URL.createObjectURL(Array.from(images.files)[0]))
            console.log(profImage, "imgprev")
        }
        else {
            setImgPrev(profImage || "https://connectidbucket.s3.amazonaws.com/No_image_available.png")
        }
    }


    return (
        <>
            <div className='postFormHeader'>
                <div style={
                    {fontSize: "18px"}
                }>Edit my profile</div>
            </div>
            <button className='editUserimg' style={{right:"2%", top:"2%"}} onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark" style={{fontSize:"30px"}}/></button>
            <div className='userFormBody'>
                <div className='imageEdit'>
                <img className='userImage' src={imgPrev} onChange={e => {e.target.style.objectFit = "cover";e.target.style.borderRadius = "50%"}} onError={e => {e.target.src = "https://connectidbucket.s3.amazonaws.com/imgError.png";e.target.style.objectFit = "contain";e.target.style.borderRadius = 0;}}/>
                <label className='editUserimg'  style={{left:"15%"}}>
                    <i className="fa-solid fa-camera-retro" style={{fontSize:"30px"}}/>
                    <input
                    onChange={e => imgPreviews(e)}
                    id='imagesInput'
                    className='imagesInput'
                    type="file"
                    accept="image/*"
                    style={{display:"none"}}
                    />
                </label>
                <button className='editUserimg' style={{right:"15%"}} onClick={() => {setProfImage('');setImgPrev("https://connectidbucket.s3.amazonaws.com/No_image_available.png")}}><i className="fa-regular fa-trash-can" style={{fontSize:"30px"}}/></button>
                </div>
                <div className="errorMsgText">{!!errors.errors && errors.errors + '. '}</div>
                <form onSubmit={editUserFunc}>
                    <div className='inputField'>
                        <label className='inputText'>My description</label>
                        <input className='inputBar' type='text'
                            onChange={
                                (e) => setDescription(e.target.value)
                            }
                            value={description}/>
                    </div>
                    <div style={{marginLeft:"5px"}}  className="errorMsgText">{!!errors.description && errors.description}{(description.length > 250) && (` ${description.length}/250`)}</div>
                    <div className='inputField'>
                        <label className='inputText'>My location</label>
                        <input className='inputBar' type='text'
                            onChange={
                                (e) => setLocation(e.target.value)
                            }
                            value={location}/>
                    </div>
                    <div style={{marginLeft:"5px"}} className="errorMsgText">{!!errors.location && errors.location}{(location.length > 50) && (` ${location.length}/50`)}</div>
                    <button className='editProfButton' type='submit'>Save</button>
                </form>
            </div>
        </>
    );
}
export default EditUserForm;
