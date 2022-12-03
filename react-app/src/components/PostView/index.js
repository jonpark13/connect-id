import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostWindow from './PostWindow';

function PostViewModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img src={post.images[0]} style={{ maxHeight: "1000px",width: "100%",objectFit: "cover"}} onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => {setShowModal(false);document.body.style.overflow = 'scroll'}} type={'postView'}>
          <PostWindow post={post} showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PostViewModal