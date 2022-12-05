import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from './CreatePostForm';

function CreatePost() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='postsCreatorButton' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => {setShowModal(false)}} type={'postForm'}>
          <CreatePostForm type={'create'} showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePost