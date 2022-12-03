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
        <div className='postViewBody'>
            {!!post.images.length && <Gallery list={[]} prevList={post.images} height={"100%"} width={"740px"}/>}
        </div>
        <div className='postViewHeader'>
            <UserInfo user={post.user_info} time={time}/>
            <CommentBoard post={post} session={session} fetchData={fetchData}/>
        </div>
        </div>
    );
}
export default PostWindow;
