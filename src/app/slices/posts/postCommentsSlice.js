import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import purpleIcon from '../../../images/reddit-logo.png'

export const getPostComments = createAsyncThunk(
    'postComments/getPostComments',
    async (endPoint, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.reddit.com${endPoint}.json`)

            if (!response.ok) {
                throw new Error('Failed to fetch comments')
            }

            const json = await response.json()
            const comments = json[1].data.children

            const commentsWithIcons = await Promise.all(
                comments.map(async (comment) => {
                    const author = comment.data.author
                    let icon = purpleIcon

                    try {
                        const userResponse = await fetch(`https://www.reddit.com/user/${author}/about.json`);
                        if (userResponse.ok) {
                            const userJson = await userResponse.json()
                            icon = userJson.data.icon_img?.trim() || purpleIcon
                        }
                    } catch {
                        console.warn(`Failed to fetch icon for user: ${author}`)
                    }

                    return {
                        id: comment.data.id,
                        author: comment.data.author,
                        body: comment.data.body,
                        upvotes: comment.data.ups,
                        icon,
                    }
                })
            )

            return commentsWithIcons;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const postCommentsSlice = createSlice({
    name: 'postComments',
    initialState: {
        info: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getPostComments.fulfilled, (state, action) => {
            state.info = action.payload
        })
    }
})

export default postCommentsSlice.reducer