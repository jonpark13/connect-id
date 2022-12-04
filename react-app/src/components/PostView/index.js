import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostWindow from './PostWindow';
import './PostWindow.css'

function PostViewModal({post, time, fetchData, type}) {
  const [showModal, setShowModal] = useState(false);

  let refButton
  if(type === 'post'){
    refButton = (
      <img className='postImageView' src={post.images[0]} onClick={() => setShowModal(true)}/>
    )
  }
  if(type === 'news'){
    refButton = (
      <div key={post.id} onClick={() => setShowModal(true)}>
        <div>
          {post.post_body}
        </div>
        <div>
          {time}
        </div>
      </div>
    )
  }

  return (
    <>
      {refButton}
      {showModal && (
        <Modal onClose={() => {setShowModal(false);document.body.style.overflow = ''}} type={'postView'}>
          <PostWindow post={post} showModal={showModal} setShowModal={setShowModal} time={time} fetchData={fetchData}/>
        </Modal>
      )}
    </>
  );
}

export default PostViewModal