import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import * as postActions from '../../store/post'
import CreatePostForm from "../CreatePost/CreatePostForm";


function EditPostModal({showModal, setShowModal, postInfo, fetchData}) {
  const dispatch = useDispatch()
  // const [showModal, setShowModal] = useState(false);
  const [postBody, setPostBody] = useState(postInfo.post_body)
  const [postImages, setPostImages] = useState(postInfo.images)
  const [imageLoading, setImageLoading] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault()
    let payload = {
        user_id: postInfo.user_info.id,
        post_body: postBody,
        images: postInfo.images
    }
    console.log(payload.images, "PRIOR")

    let images = document.querySelector(".imagesInputEdit")
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
        const dataToArr = (data.images.replace(/[\[\]']+/g,'')).split(', ')
        payload.images = (payload.images.concat(dataToArr)).filter(e => e)
        }
      }
    console.log(payload.images, "POST")
    dispatch(postActions.editUserPost(payload, postInfo.id))
    fetchData()
    document.body.style.overflow = 'scroll'
    setShowModal(false)
  }

  return (
    <>
      <button className="editButt" onClick={() => setShowModal(true)}>Edit Post</button>
      {showModal && (
        <Modal onClose={() => {setShowModal(false);document.body.style.overflow = 'scroll'}} type={'postForm'}>
          <CreatePostForm type={"edit"} showModal={showModal} setShowModal={setShowModal} postInfo={postInfo} fetchData={fetchData}/>
            {/* <div style={{width: "100%"}}>
            {JSON.stringify(postInfo)}
            {"Edit Post"}
                <div>
                    {postInfo.user_info.first_name} {postInfo.user_info.last_name}
                </div>
                <div>
                    <form onSubmit={handleEdit}>
                        <textarea value={postBody} onChange={(e) => setPostBody(e.target.value)}/>
                        <label style={{display:"flex", flexDirection:"column", alignItems:'center', width:'max-content'}}>
                            <div className='circleBackground'>
                            <i className="fa-regular fa-image" style={{fontSize:"30px"}}/>
                            </div>
                            <input
                            className='imagesInputEdit'
                            type="file"
                            multiple
                            accept="image/*"
                            // style={{display:"none"}}
                            />
                        </label>
                        <button type="submit">Save</button>
                    </form>
                    {
                      postInfo.images.map(img => (
                      <img src={img} style={{height: "200px", width: "200px"}}/>
                      ))
                    }
                </div>
            </div> */}
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
