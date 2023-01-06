import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import * as postActions from '../../store/post'
import './DeletePost.css'


function DeleteCommentModal({commentInfo, handleDeleteComment, fetchData}) {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="modalButton" onClick={() => setShowModal(true)} >
              <i style={{margin:"12px", width:"18px"}} className="fa-regular fa-trash-can" />
                  Delete Comment
              </button>
      {showModal && (
        <Modal onClose={() => {setShowModal(false)}} type={'postForm'}>
            <>
                <div className='deletePostHeader'>
                    <div style={{fontSize:"18px", margin:"10px 0px 5px 0px"}}>Delete Comment?</div>
                    <div className="txt" style={{fontSize:"16px", margin:"5px 0px 10px 0px"}}>
                        Are you sure you want to permanently remove this comment?
                    </div>
                </div>
                <div className="deleteOptions">
                    <button className="cancelDeleteButton" onClick={
                      (e) => {
                          setShowModal(false)
                      }}>
                        Cancel
                    </button>
                    <button className="deletePostButton" onClick={
                      (e) => {
                            handleDeleteComment(e, commentInfo.id)
                          fetchData()
                          setShowModal(false)
                      }}>
                        Delete
                    </button>
                
                </div>
            </>
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
