import {useState} from 'react'
import { useSelector } from 'react-redux'
import CommentOptions from '../CommentOptions'
import EditCommentModal from './CommentModal'
import PostOptions from './PostOptions'

function HomePost({post, session, fetchData}) {
    const user = useSelector((state) => state.session.user)
    const [newComments, setNewComments] = useState('')
    const [hidden, setHidden] = useState(true)
    const [errors, setErrors] = useState({})

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

    const handleUnlikePost = async (e, id) => {
        e.preventDefault()
        const response = await fetch(`/api/likes/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const resData = response.json()
            console.log(resData, "unLIKE RESULTS")
            fetchData()
        }
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
        console.log(resData, "RES")
        if(!response.ok) {
            setErrors(resData)
        }
        else {
            setErrors('')
            setNewComments('')
            fetchData()
        }
    }

    const timeSince = (date) => {
        date = new Date(date);

        let seconds = Math.floor((new Date() - date) / 1000);
        let intervalType;
      
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
          intervalType = 'year';
        } else {
          interval = Math.floor(seconds / 2592000);
          if (interval >= 1) {
            intervalType = 'month';
          } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
              intervalType = 'day';
            } else {
              interval = Math.floor(seconds / 3600);
              if (interval >= 1) {
                intervalType = "hour";
              } else {
                interval = Math.floor(seconds / 60);
                if (interval >= 1) {
                  intervalType = "minute";
                } else {
                  interval = seconds;
                  intervalType = "second";
                }
              }
            }
          }
        }
      
        if (interval > 1 || interval === 0) {
            if(interval === 0 && intervalType == "second"){
                return "now"
            }
            else {
                intervalType += 's';
            }
        }
      
        return interval + ' ' + intervalType + ' ago';
      };

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
            <div className='postBodyContainer'> {
                post.post_body
            } </div>
            {
            post.images && <div>
                <img src={
                        post.images[0]
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
                !!post.likes.length ? (<div style={{fontSize:"12px", color:"grey"}}>
                <i className="fa-regular fa-thumbs-up" /> {
                    post.likes.length
                } </div>) : <div></div>
            }
            {
                !!post.comments.length && (<div className='quickComment' onClick={() => setHidden(!hidden)}>
                    {
                        post.comments.length
                    } {post.comments.length > 1 ? "comments" : "comment"}</div>)
            }
        </div>
            <div className='buttonsContainer'>
                {/* { (post.likes.filter(e => e.user_id == user.id)[0]).id + 'TEST'} */}
            {
                !!post.likes.filter(e => e.user_id == user.id).length ?
                (<button className='postButton' style={{color:'rgb(88,139,157)'}} onClick={(e) => handleUnlikePost(e, (post.likes.filter(e => e.user_id == user.id)[0]).id)}><i className="fa-solid fa-hand-spock" />{' ' + "Like"}</button>) :
                (<button className='postButton' onClick={(a) => handleLikePost(a, post.id)}><i className="fa-regular fa-hand-spock" /> Like</button>)
            }
            <button className='postButton' onClick={() => setHidden(!hidden)}>
                <i className="fa-regular fa-comment-dots" /> Comment
            </button>

            </div>
            <div className='commentsContainer' style={hidden ? {display: "none"} : {display: "flex"}}>
            <div className='commentinputBar'>
                <input placeholder='Add a comment'
                    value={newComments}
                    onChange={
                        (e) => setNewComments(e.target.value)
                    }/> {
                newComments && <button className="postCommentButton" onClick={
                    (a) => handleCommentPost(a, post.id)
                }>
                    Post
                </button>
            } </div>
            <div className="errorMsgText">{!!errors.comment && errors.comment + '. '}{newComments.length > 250 && ` ${newComments.length}/250`}</div>
            <div className='commentsList'> {
                post.comments.map(com => (
                    <div style={{margin: "5px 0px"}}>
                        <div style={{height: "30px"}}> {com.user_info.first_name} {com.user_info.last_name}
                            <div>{timeSince(com.created_on)}</div>
                            {com.user_info.id === session.user.id && 
                            <CommentOptions commentInfo={com} session={session} fetchData={fetchData}/>
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
