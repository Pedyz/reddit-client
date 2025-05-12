import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recent: JSON.parse(sessionStorage.getItem('recent')) || []
}

const recentSlice = createSlice({
    name: 'recent',
    initialState,
    reducers: {
        addRecent: (state, action) => {
            const subreddit = action.payload

            const filtered = state.recent.filter(item => item !== subreddit)
            
            filtered.unshift(subreddit)

            if (filtered.length > 5) {
                filtered.pop()
            }

            state.recent.length = 0
            state.recent.push(...filtered)

            sessionStorage.setItem('recent', JSON.stringify(state.recent))
            
        }
    }
})

export const { addRecent } = recentSlice.actions
export default recentSlice.reducer