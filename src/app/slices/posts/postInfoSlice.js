import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPostData = createAsyncThunk(
    'postInfo/getPostData',
    async (pathname) => {

        const pathName = pathname

        const getPostJson = async () => {
            const response = await fetch(`https://www.reddit.com${pathName}.json`)
            const json = await response.json()
            const data = json[0].data.children[0].data

            return data
        }

        const getSubRedditIcon = async (sub) => {
            const response = await fetch(`https://www.reddit.com/${sub}/about.json`);
            const json = await response.json();
            const data = json.data;
            return data.icon_img || 'https://static-00.iconduck.com/assets.00/reddit-icon-2048x2048-ya82zt8l.png';
        }

        const data = await getPostJson()
        const previewImage = data?.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") || null;
        const info = {
            subRedditIcon: await getSubRedditIcon(data.subreddit_name_prefixed),
            subReddit: data.subreddit_name_prefixed,
            author: data.author,
            text: data.title,
            imgUrl: data?.url ? data.url : previewImage,
            videoUrl: data?.media?.reddit_video?.fallback_url,
            data: data
        }

        console.log(info)
        return info
    })


const postInfoSlice = createSlice({
    name: 'postInfo',
    initialState: {
        info: {
            subRedditIcon: '',
            subReddit: '',
            author: '',
            text: '',
            imgUrl: '',
            videoUrl: '',
            data: {}
        },
        status: 'idle'
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostData.fulfilled, (state, action) => {
                state.info = action.payload
                state.status = 'succeeded'
            })
            .addCase(getPostData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPostData.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export default postInfoSlice.reducer