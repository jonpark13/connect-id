import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from './CreatePostForm';

function CreatePost() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='postsCreatorButton' onClick={() => setShowModal(true)}>Start a post</button>
      {showModal && (
        <Modal onClose={() => {setShowModal(false);document.body.style.overflow = 'scroll'}} type={'postForm'}>
          <CreatePostForm showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePost