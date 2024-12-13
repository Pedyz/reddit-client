import { configureStore } from "@reduxjs/toolkit";
import postsSlice from './slices/posts/postsSlice'
import postInfoSlice from './slices/posts/postInfoSlice'

const store = configureStore({
    reducer: {
        posts: postsSlice,
        postInfo: postInfoSlice
    }
})

export default store