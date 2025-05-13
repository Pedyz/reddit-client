import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import purpleIcon from '../../../images/reddit-logo.png'

export const getSubRedditInfo = createAsyncThunk(
    'subreddit/getSubRedditInfo',
    async (pathname) => {
        const sub = pathname

        try {
            const response = await fetch(`https://www.reddit.com${sub}/about.json`)
            const json = await response.json()
            const data = json.data
            console.log(data)
            
            return {
                name: data.display_name_prefixed,
                icon: data?.icon_img || purpleIcon,
                banner: data?.banner_img,
                title: data.title,
                url: data.url,
                active_accounts: data.accounts_active,
                subscribers: data.subscribers,
                description: data.public_description 
            }
        } catch (error) {
            console.log(error)
        }     
    }
) 

export const getSubRedditPosts = createAsyncThunk(
    'subreddit/getSubRedditPosts',
    async (pathname) => {
        const sub = pathname

        try {
            const response = await fetch(`https://www.reddit.com${sub}.json`)
            const json = await response.json()
            const data = json.data.children
            
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const subRedditInfoSlice = createSlice({
    name: 'subreddit',
    initialState: {
        posts: [],
        info: {

        },
        status: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getSubRedditInfo.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getSubRedditInfo.fulfilled, (state, action) => {
            state.info = action.payload
            state.status = 'succeeded'
            console.log(action.payload)
        })
        .addCase(getSubRedditInfo.rejected, (state) => {
            state.status = 'failed'
        })
        .addCase(getSubRedditPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }
}) 

export default subRedditInfoSlice.reducer