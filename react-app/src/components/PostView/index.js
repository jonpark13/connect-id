import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostWindow from './PostWindow';
import './PostWindow.css'

function PostViewModal({post, time, fetchData}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img className='postImageView' src={post.images[0]} onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => {setShowModal(false);document.body.style.overflow = ''}} type={'postView'}>
          <PostWindow post={post} showModal={showModal} setShowModal={setShowModal} time={time} fetchData={fetchData}/>
        </Modal>
      )}
    </>
  );
}

export default PostViewModal