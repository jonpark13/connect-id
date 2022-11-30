import {useState} from 'react'
import EditCommentModal from './CommentModal'
import PostOptions from './PostOptions'

function HomePost({post, session, fetchData}) {
    const [newComments, setNewComments] = useState('')
    const [hidden, setHidden] = useState(true)

    const handleLikePost = async (e, postId) => {
        e.preventDefault()
        let payload = {
            type: "thumbsup",
            user_id: session.user.id,
            post_id: postId
        }
        const response = await fetch(`/api/posts/${postId}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const resData = await response.json()
        console.log(resData, "LIKE RESULTS")
        fetchData()
    }

    const handleCommentPost = async (e, postId) => {
        e.preventDefault()
        let payload = {
            comment: newComments,
            user_id: session.user.id,
            post_id: postId
        }
        const response = await fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const resData = await response.json()
        console.log(resData, "COMMENT RESULTS")
        fetchData()
    }

    return (
        <div className='postContainer'
            style={
                {padding: "15px 20px"}
        }>
            <div className='postHeader'>
                <div>
                    <strong>{
                        post.user_info.first_name
                    }
                        {
                        post.user_info.last_name
                    }</strong>
                </div>
                <div style={{float:"right", height:"40px"}}>
                <PostOptions session={session} postInfo={post} fetchData={fetchData}/>
                </div>
            </div>
            <div> {
                post.post_body
            } </div>
            {
            post.images && <div>
                <img src={
                        post.images
                    }
                    style={
                        {
                            maxHeight: "1000px",
                            width: "100%",
                            objectFit: "cover"
                        }
                    }/>
            </div>
        }
        <div className='postQuickInfo'>
            {
                !!post.likes.length && (<div style={{fontSize:"12px", color:"grey"}}>
                <i className="fa-regular fa-thumbs-up" /> {
                    post.likes.length
                } </div>)
            }
            {
                !!post.comments.length && (<div className='quickComment' onClick={() => setHidden(!hidden)}>
                    {
                        post.comments.length
                    } {post.comments.length > 1 ? "comments" : "comment"}</div>)
            }
        </div>
            <div className='buttonsContainer'>

            <button className='postButton' onClick={(a) => handleLikePost(a, post.id)}><i className="fa-regular fa-hand-spock" /> Like</button>
            <button className='postButton' onClick={() => setHidden(!hidden)}>
                <i className="fa-regular fa-comment-dots" /> Comment
            </button>

            </div>
            <div className='commentsContainer' style={hidden ? {display: "none"} : {display: "flex"}}>
            <div>
                <input placeholder='comment'
                    value={newComments}
                    onChange={
                        (e) => setNewComments(e.target.value)
                    }/> {
                newComments && <button onClick={
                    (a) => handleCommentPost(a, post.id)
                }>
                    Post
                </button>
            } </div>
            <div> {
                post.comments.map(com => (
                    <div style={{margin: "5px 0px"}}>
                    <div> {com.user_info.first_name} {com.user_info.last_name}
                    {com.user_info.id === session.user.id && 
                    <EditCommentModal commentInfo={com} session={session} fetchData={fetchData}/>
                    }
                    </div>
                    <div style={{width: "100%", display: "flex", wordBreak: "break-all"}}> {com.comment}</div>
                    </div>
                ))
            } </div>
            </div>
        </div>

    )
}
export default HomePost;
