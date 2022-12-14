import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as postActions from '../../store/post';
import DeletePostModal from "./DeletePostModal";
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
              {/* <button className="modalButton" onClick={
                (e) => {
                    handleDeletePost(e, postInfo.id);
                    fetchData()
                }
              }><i style={{margin:"12px", width:"18px"}} className="fa-regular fa-trash-can" />
                  Delete Post
              </button> */}
              <DeletePostModal postInfo={postInfo} handleDeletePost={handleDeletePost} fetchData={fetchData}/>
            </>
          }
        </div>
      </>
  );
}

export default PostOptions;
