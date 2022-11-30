import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Modal} from "../../context/Modal";


function EditCommentModal({commentInfo, session, fetchData}) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [commentBody, setCommentBody] = useState(commentInfo.comment)

    const handleEditComment = async (e, commentId) => {
        e.preventDefault()
        let payload = {
            comment: commentBody,
            user_id: session.user.id
        }
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const resData = await response.json()
        console.log(resData, "COMMENT RESULTS")
        fetchData()
        setShowModal(false)
    }

    useEffect(() => {
        setCommentBody(commentInfo.comment)
    }, [commentInfo])

    return (
        <>
            <button className="editButt"
                onClick={
                    () => setShowModal(true)
            }>Edit Comment</button>
            {
            showModal && (
                <Modal onClose={
                    () => {setShowModal(false);document.body.style.overflow = 'scroll'}
                } type={'postForm'}
                >
                    <div style={
                        {width: "100%"}
                    }>
                        {
                        JSON.stringify(commentInfo)
                    }
                        <div> {
                            commentInfo.user_info.first_name
                        }
                            {
                            commentInfo.user_info.last_name
                        } </div>
                        <div>
                            <form onSubmit={(e) => handleEditComment(e, commentInfo.id)}>
                                <input value={commentBody}
                                    onChange={
                                        (e) => setCommentBody(e.target.value)
                                    }/>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )
        } </>
    );
}

export default EditCommentModal;
