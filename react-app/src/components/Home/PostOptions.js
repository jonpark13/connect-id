import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import * as postActions from '../../store/post';
import EditPostModal from './PostModal';

function PostOptions({session, postInfo, fetchData}) {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if(e.target.className=="postOptionsContainer"){
            e.stopPropagation();
            e.preventDefault();
        }
        else {

            setShowMenu(false);
        }
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleDeletePost = (e, id) => {
    e.preventDefault()
    dispatch(postActions.deleteUserPost(id))
}

  return (
    <>
    <div style={{float:"right", height:"40px"}} onClick={openMenu}>
        <div style={{fontSize:"25px", float:"right", color:"grey"}}>
            <i className="fa-solid fa-ellipsis" />
        </div>
    </div>
        <div className="postOptionsContainer" style={showMenu ? {display:"flex"} : {display:"none"}}>
          { session.user.id === postInfo.user_info.id &&
            <>
              <EditPostModal showModal={showModal} setShowModal={setShowModal} postInfo={postInfo} fetchData={fetchData}/>
              <button onClick={
                (e) => {
                    handleDeletePost(e, postInfo.id);
                    fetchData()
                }
              }>
                  Delete Post
              </button>
            </>
          }
        </div>
      </>
  );
}

export default PostOptions;
