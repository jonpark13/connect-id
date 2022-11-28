const ADD_POST = 'post/addPost';
const GET_POSTS = 'post/getPosts';
const EDIT_POST = 'post/editPost';
const DELETE_POST = 'post/deletePost';
const CLEAR_POSTS = 'post/clearPosts'

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}


const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

const clearPosts = () => {
    return {
        type: CLEAR_POSTS
    }
}

export const getUserPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/current`)
    const data = await response.json()
    if (!data.message) {
        dispatch(getPosts(data))
        return data;
    }
};

export const addUserPost = (postData) => async (dispatch) => {
    
    const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(addPost(newPost));
        return newPost.post;
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const editUserPost = (postData, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    });
    if (response.ok) {
        const editedPost = await response.json();
        dispatch(editPost(editedPost));
        return editedPost
    }
    return response;
}

export const deleteUserPost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deletePost(id))
    }
}

export const clearUserComm = () => async (dispatch) => {
    dispatch(clearPosts())
    return {message: "User cleared"};
};

const initialState = {}

let newState = {}
const postReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_POSTS:
            console.log(action.posts)
            action.posts.posts.forEach((post) => newState[post.id] = post)
            return newState
        case ADD_POST:
            return {
                ...state, [action.post.id]: action.post
            }
        case EDIT_POST: {
            return {
                ...state, [action.post.id]: action.post
            }
        }
        case DELETE_POST: {
            let newState = { ...state };
            delete newState[action.postId];
            return newState;
        }
        case CLEAR_POSTS: 
            return { ...initialState }
        default:
            return state
    }
};

export default postReducer;
