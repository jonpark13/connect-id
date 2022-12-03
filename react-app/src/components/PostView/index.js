import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostWindow from './PostWindow';

function PostViewModal({post, time}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img src={post.images[0]} style={{ maxHeight: "1000px",width: "100%",objectFit: "cover"}} onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => {setShowModal(false);document.body.style.overflow = ''}} type={'postView'}>
          <PostWindow post={post} showModal={showModal} setShowModal={setShowModal} time={time}/>
        </Modal>
      )}
    </>
  );
}

export default PostViewModal