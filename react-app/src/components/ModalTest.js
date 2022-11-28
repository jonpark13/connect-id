import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../context/Modal";
import * as postActions from './../store/post'


function EditPostModal({postInfo}) {
    const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [postBody, setPostBody] = useState(postInfo.post_body)
  const [postImages, setPostImages] = useState(postInfo.images)

  const handleEdit = (e) => {
    e.preventDefault()
    let payload = {
        user_id: postInfo.user_info.id,
        post_body: postBody,
        images: postImages
    }

    dispatch(postActions.editUserPost(payload, postInfo.id))
    setShowModal(false)
  }

  return (
    <>
      <button className="editButt" onClick={() => setShowModal(true)}>Edit Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <div style={{width: "100%"}}>
            {JSON.stringify(postInfo)}
                <div>
                    {postInfo.user_info.first_name} {postInfo.user_info.last_name}
                </div>
                <div>
                    <form onSubmit={handleEdit}>
                        <textarea value={postBody} onChange={(e) => setPostBody(e.target.value)}/>
                        <input value={postImages}  onChange={(e) => setPostImages(e.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
                    <img src={postInfo.images} style={{height: "200px", width: "200px"}}/>
                </div>
            </div>
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
