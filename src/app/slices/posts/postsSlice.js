import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getHomePagePosts = createAsyncThunk(
    'posts/getHomePagePosts',
    async () => {
        const getSubRedditIcon = async (sub) => {
            const response = await fetch(`https://www.reddit.com/${sub}/about.json`);
            const json = await response.json();
            const data = json.data;
            return data.icon_img || 'https://static-00.iconduck.com/assets.00/reddit-icon-2048x2048-ya82zt8l.png';
        }

        const getHomePageJson = async () => {
            const response = await fetch('https://www.reddit.com/.json');
            const json = await response.json();
            return json.data;
        }

        const posts = await getHomePageJson();

        const postsData = await Promise.all(posts.children.map(async post => {
            const icon = await getSubRedditIcon(post.data.subreddit_name_prefixed);
            return {
                data: post.data,
                name: post.data.subreddit_name_prefixed,
                text: post.data.title,
                imgUrl: post.data.url,
                videoUrl: post.data.media,
                key: post.data.id,
                subIcon: icon
            };
        }));

        return postsData
    }
)

export const getSearchPosts = createAsyncThunk(
    'posts/getSearchPosts',
    async (searchQuery) => {
        const response = await fetch(`https://www.reddit.com/search.json${searchQuery}`);
        if (!response.ok) {
            throw new Error('Failed to fetch search posts');
        }

        const json = await response.json();
        const data = json.data;

        const getSubRedditIcon = async (sub) => {
            const response = await fetch(`https://www.reddit.com/${sub}/about.json`);
            const json = await response.json();
            const data = json.data;
            return data.icon_img || 'https://static-00.iconduck.com/assets.00/reddit-icon-2048x2048-ya82zt8l.png';
        }

        const postsData = await Promise.all(data.children.map(async post => {
            const icon = await getSubRedditIcon(post.data.subreddit_name_prefixed);
            return {
                data: post.data,
                name: post.data.subreddit_name_prefixed,
                text: post.data.title,
                imgUrl: post.data.url,
                videoUrl: post.data.media,
                key: post.data.id,
                subIcon: icon
            };
        }));

        console.log(data)

        return postsData;
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomePagePosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getHomePagePosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(getHomePagePosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSearchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSearchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(getSearchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default postsSlice.reducer