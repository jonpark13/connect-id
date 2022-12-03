import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import * as postActions from '../../store/post'
import Gallery from '../Gallery';
import UserInfo from '../UserInfo';
import './PostWindow.css'

function PostWindow({showModal, setShowModal, post, time}) {


    return (
        <div className='postViewContainer'>
        <div className='postViewBody'>
            {!!post.images.length && <Gallery list={[]} prevList={post.images} height={"100%"} width={"100%"}/>}
        </div>
        <div className='postViewHeader'>
            <UserInfo user={post.user_info} time={time}/>
        </div>
        </div>
    );
}
export default PostWindow;
