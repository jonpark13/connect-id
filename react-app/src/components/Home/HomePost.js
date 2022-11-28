import {useState} from 'react'

function HomePost({post, session, fetchData}) {
    const [newComments, setNewComments] = useState('')

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
                {margin: "20"}
        }>
            <div>
                <div>
                    <strong>{
                        post.user_info.first_name
                    }
                        {
                        post.user_info.last_name
                    }</strong>
                </div>
            </div>
            {
            post.images && <div>
                <img src={
                        post.images
                    }
                    style={
                        {
                            height: "120px",
                            width: "120px",
                            objectFit: "cover"
                        }
                    }/>
            </div>
        }
            <div> {
                post.post_body
            } </div>
            <div>
                likes: {
                post.likes.length
            } </div>
            <button onClick={
                (a) => handleLikePost(a, post.id)
            }>Like</button>
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
                    </div>
                    <div> {com.comment}</div>
                    </div>
                ))
            } </div>
        </div>

    )
}
export default HomePost;
