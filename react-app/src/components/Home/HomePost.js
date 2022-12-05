import {useState} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CommentOptions from '../CommentOptions'
import PostViewModal from '../PostView'
import UserInfo from '../UserInfo'
import PostOptions from './PostOptions'

function HomePost({post, session, fetchData}) {
    const user = useSelector((state) => state.session.user)
    const history = useHistory()
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
        // console.log(resData, "LIKE RESULTS")
        fetchData()
    }

    const handleUnlikePost = async (e, id) => {
        e.preventDefault()
        const response = await fetch(`/api/likes/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const resData = response.json()
            // console.log(resData, "unLIKE RESULTS")
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
        // console.log(resData, "RES")
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
        if (interval < 0 || (interval === 0 && intervalType === "second")) return "now"
        if (interval > 1 || interval === 0) {
            intervalType += 's';
        }
      
        return interval + ' ' + intervalType;
      };

    return (
        <div className='postContainer'
            style={
                {padding: "15px 20px"}
        }>
            <div className='postHeader'>
                <UserInfo user={post.user_info} time={timeSince(post.created_on)}/>
                <div style={{float:"right", height:"40px"}}>
                { post.user_info.id === session.user.id &&
                    <PostOptions session={session} postInfo={post} fetchData={fetchData}/>
                }
                </div>
            </div>
            <div className='postBodyContainer'> {
                post.post_body
            } </div>
            {
            post.images && <div style={{width:"calc(100% + 40px", margin:"0px -20px", boxSizing:"border-box"}}>
                <PostViewModal post={post} time={timeSince(post.created_on)} fetchData={fetchData} type={'post'}/>
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
                (post.comments).sort(function(a, b) {
                    return a.id - b.id;
                  }).map(com => (
                    <div className='commentBoxContainer' style={{margin: "10px 0px"}}>
                        <div className='commentUser' onClick={() => history.push(`/id/${com.user_info.id}`)}>
                        {!!com.user_info.profile_image ? <img className='commentUserImage' src={com.user_info.profile_image} onError={e => e.target.src = "https://connectidbucket.s3.amazonaws.com/No_image_available.png"}/> : <i className="fa-regular fa-circle-user" />}
                        </div>
                        <div className='commentBoxContent'>
                        <div className='commentBoxHeader'> 
                            <div className='commentBoxHeaderL'> 
                            <div className='commentUserContainer'>
                            <div className='commentUserInfo' onClick={() => history.push(`/id/${com.user_info.id}`)}>
                                {com.user_info.first_name} {com.user_info.last_name}
                            </div>
                            <div className='commentUserDesc'>
                                {com.user_info.description}
                            </div>
                            </div>
                            </div>
                            <div className='commentBoxHeaderR'>
                                <div className='timeStamp'>{timeSince(com.created_on)}</div>
                                {com.user_info.id === session.user.id && 
                                <CommentOptions commentInfo={com} session={session} fetchData={fetchData}/>
                                }
                            </div>      
                        </div>
                        <div className='commentBoxComment' style={{width: "100%", display: "flex", wordBreak: "break-all"}}> {com.comment}</div>
                        </div>
                    </div>
                ))
            } </div>
            </div>
        </div>

    )
}
export default HomePost;
