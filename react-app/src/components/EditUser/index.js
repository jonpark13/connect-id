import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUserForm from './EditUserForm';

function EditUser() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='editUserButton' onClick={() => setShowModal(true)}><i className="fa-regular fa-pen-to-square" style={{fontSize:"30px"}}/></button>
      {showModal && (
        <Modal onClose={() => {setShowModal(false)}} type={'postForm'}>
          <EditUserForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditUser