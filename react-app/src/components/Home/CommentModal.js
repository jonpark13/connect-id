import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Modal} from "../../context/Modal";
import './EditPostForm.css'


function EditCommentModal({commentInfo, session, fetchData}) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [commentBody, setCommentBody] = useState(commentInfo.comment)
    const [errors, setErrors] = useState({})

    const handleEditComment = async (e, commentId) => {
        e.preventDefault()
        let payload = {
            comment: commentBody,
            user_id: session.user.id,
            post_id: commentInfo.post_id
        }
        console.log(payload)
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const resData = await response.json()
        if (! response.ok) {
            setErrors(resData)
        } else {
            setErrors('')
            setCommentBody('')
            fetchData()
            document.body.style.overflow = 'scroll'
            setShowModal(false)
        }
        console.log(resData, "COMMENT RESULTS")
    }

    useEffect(() => {
        setCommentBody(commentInfo.comment)
    }, [commentInfo])

    return (
        <>
            <button className="modalButton"
                onClick={
                    () => setShowModal(true)
            }><i style={{margin:"12px", width:"18px"}} className="fa-solid fa-pencil" />Edit Comment</button>
            {
            showModal && (
                <Modal onClose={
                        () => {
                            setShowModal(false);
                            document.body.style.overflow = 'scroll'
                        }
                    }
                    type={'postForm'}>
                    <div className="commentFormHeader"
                        style={
                            {width: "100%"}
                    }>
                        Edit Comment
                    </div>
                    <div className="commentFormBody">
                        <div>
                            <form onSubmit={
                                (e) => handleEditComment(e, commentInfo.id)
                            }>
                                <textarea className="commentText"  value={commentBody}
                                        onChange={
                                            (e) => setCommentBody(e.target.value)
                                        }
                                    />
                                <div className="errorMsgText">{!!errors.comment && errors.comment + ' '}{(commentBody.length > 250) && (` ${commentBody.length}/250`)}</div>
                                <div className='postBottom'>
                                    <div></div>
                                    <button className={
                                            !!commentBody.length ? "createPostButton" : "createPostButtonDisabled"
                                        }
                                        disabled={
                                            !commentBody.length
                                        }
                                        type='submit'>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )
        } </>
    );
}

export default EditCommentModal;
