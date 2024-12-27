import { configureStore } from "@reduxjs/toolkit";
import postsSlice from './slices/posts/postsSlice'
import postInfoSlice from './slices/posts/postInfoSlice'
import postCommentsSlice from './slices/posts/postCommentsSlice'

const store = configureStore({
    reducer: {
        posts: postsSlice,
        postInfo: postInfoSlice,
        postComments: postCommentsSlice
    }
})

export default store