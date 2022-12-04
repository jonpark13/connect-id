import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import * as postActions from '../../store/post'
import Gallery from '../Gallery';
import CommentBoard from '../Home/CommentBoard';
import UserInfo from '../UserInfo';
import './PostWindow.css'

function PostWindow({showModal, setShowModal, post, time, fetchData}) {
    const session = useSelector(state => state.session)

    return (
        <div className='postViewContainer'>
            {post.images[0] != '' && !!post.images.length && 

        <div className='postViewBody'>
            <Gallery list={[]} prevList={post.images} height={"100%"} width={"740px"}/>
        </div>
            }
        <div className='postViewHeader' style={(post.images[0] != '' && !!post.images.length) ? {width:"350px"} : {width:"500px"}}>
            <UserInfo user={post.user_info} time={time}/>
            <div className='postBodyModal'>
                {post.post_body}
            </div>
            <CommentBoard post={post} session={session} fetchData={fetchData}/>
        </div>
        </div>
    );
}
export default PostWindow;
