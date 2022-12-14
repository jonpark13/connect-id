import React, { useContext, useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current)
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div name="ref" ref={modalRef} />
    </>
  )
}

export function Modal({ onClose, type, children }) {
  const modalNode = useContext(ModalContext);
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal" >
      <div id="modal-background" onClick={onClose} />
      <div className={type}>
        {children}
      </div>
    </div>,
    modalNode
  )
}
