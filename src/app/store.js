import { configureStore } from "@reduxjs/toolkit";
import postsSlice from './slices/posts/postsSlice'
import postInfoSlice from './slices/posts/postInfoSlice'
import postCommentsSlice from './slices/posts/postCommentsSlice'
import subRedditInfoSlice from './slices/subreddit/subRedditInfoSlice'

const store = configureStore({
    reducer: {
        posts: postsSlice,
        postInfo: postInfoSlice,
        postComments: postCommentsSlice,
        subRedditInfo: subRedditInfoSlice
    }
})

export default store