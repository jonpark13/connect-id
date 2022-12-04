import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import EditCommentModal from "../Home/CommentModal";

function CommentOptions({session, commentInfo, fetchData}) {
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

  const handleDeleteComment = async (e, id) => {
    e.preventDefault()
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        console.log(response.json())
        fetchData()
    }
  }

  return (
    <>
    <div className="commEllipse" onClick={e => e.stopPropagation()}>
        <i style={{color:"gray"}} className="fa-solid fa-ellipsis"  onClick={openMenu}/>
    </div>

        <div className="commentOptionsContainer" style={showMenu ? {display:"flex"} : {display:"none"}}>
          { session.user.id === commentInfo.user_info.id &&
            <>
              <EditCommentModal commentInfo={commentInfo} session={session} fetchData={fetchData}/>
              <button className="modalButton" onClick={(e) => handleDeleteComment(e, commentInfo.id)}>
              <i style={{margin:"12px", width:"18px"}} className="fa-regular fa-trash-can" />
                  Delete Comment
              </button>
            </>
          }
        </div>
      </>
  );
}

export default CommentOptions;
