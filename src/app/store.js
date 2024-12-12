import { configureStore } from "@reduxjs/toolkit";
import postsSlice from './slices/posts/postsSlice'

const store = configureStore({
    reducer: {
        posts: postsSlice
    }
})

export default store